import { Injectable, Logger, Inject } from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
const Redis = require('ioredis');
import { Client } from 'pg';
import 'dotenv/config';
import { Db, MongoClient } from 'mongodb';
const _ = require("lodash")
// import { connectToMongo, connectToRedis, getDb, getRedis,connectPG } from './mongoClient';
// import { queueMongoOperation } from './mongoQueue-dynamic';

let db: Db;
let redis
let pgClient: Client | null = null;
let pgConnecting: Promise<Client> | null = null;
let pgConfig: { connectionString: string; application_name: string } | null = null;

  //connectToMongo().then(async () => { 
   // db = await getDb();
   // console.log('Database initialized'); 
  //}).catch((error) => {
    //console.error('Error connecting to MongoDB:', error);
  //}); 

  // connectToRedis().then(() => { 
  //  redis = getRedis();
   // console.log('Redis initialized'); 
  //}).catch((error) => {
  //  console.error('Error connecting to Redis:', error);
  //});

  if (!redis) {
    redis = new Redis({
      host: process.env.HOST,
      port: parseInt(process.env.PORT),      
    }).on('error', (err) => {
      console.log('Redis Client Error', err);
      throw err;
    });
  }

 const connectPG = (): void => {
  if (!process.env.PG_URL) throw new Error('PG DATABASE_URL not found');
  pgConfig = {
    connectionString: process.env.PG_URL,
    application_name: `${process.env.CLIENTCODE}-${process.env.APPNAME}-${process.env.APPGROUPNAME}-redis_service`, 
  };
  console.log('PG config initialized');
};

const resetPGClient = (): void => {
  pgClient = null;
  pgConnecting = null;
};

  const getPGClient = async (): Promise<Client> => {
  // Return existing healthy client
  if (pgClient) return pgClient;

  // If a connect attempt is already in flight, wait for it
  if (pgConnecting) return pgConnecting;

  if (!pgConfig) throw new Error('PG not initialized. Call connectPG() first.');

  pgConnecting = (async () => {
    const client = new Client(pgConfig);
    await client.connect();

    // When the connection drops unexpectedly, clear so next call reconnects
    client.on('error', (err) => {
      console.error('PG client error:', err.message);
      pgClient = null;
      pgConnecting = null;
    });

    client.on('end', () => {
      console.warn('PG client connection ended');
      pgClient = null;
      pgConnecting = null;
    });

    pgClient = client;
    pgConnecting = null;
    console.log('PG client connected');
    return client;
  })();

  return pgConnecting;
};

 connectPG();

@Injectable()
export class RedisService {
  private readonly BATCH_SIZE = 10000

  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}


   private async getClient(): Promise<import('pg').Client> {
    return getPGClient();
  }
  //Retrieves JSON data from Redis
   /**
   * Retrieves JSON data from Redis.
   * @param key The key used to identify the JSON data in Redis.
   * @returns The JSON data retrieved from Redis.
   * @throws {Error} If there is an error retrieving the JSON data.
   */
   async getJsonData(key: string, collectionName: string) {
    try {
      let returnValue: any;
      
      if(key && collectionName){
        const parts = key.split(":");
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        requiredMarkers.forEach(marker => {
          const idx = parts.indexOf(marker);
          if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === "undefined" || parts.length <= 14) {
            throw new Error(`Invalid Redis key`);
          }
        });
        let redisResult = await redis.call('JSON.GET', key);    
        if (redisResult) {
          returnValue = redisResult;
        }else{
          if(key.includes(':FNGK:AF:'))
            returnValue = await this.getpgData(key)
        }
        
      }else{
        throw 'key/client not found'
      }
      return returnValue;
    } catch (error) {
      throw error;
    }
  }

  
   /**
   * Retrieves JSON data from Redis with a specified path.
   * @param key The key used to identify the JSON data in Redis.
   * @param path The path to the specific JSON value within the JSON data.
   * @returns The JSON value at the specified path.
   * @throws {Error} If there is an error retrieving the JSON value.
+   */
   async getJsonDataWithPath(key: string, path:any,collectionName: string) {
    try {
      let returnValue: any;
      if(collectionName){
        const parts = key.split(":");
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        requiredMarkers.forEach(marker => {
          const idx = parts.indexOf(marker);
          if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === "undefined" || parts.length <= 14) {
            throw new Error(`Invalid Redis key`);
          }
        });

        // Use CACHE_MANAGER to get cached data first
        // let cachedResult = await this.cacheManager.get<string>(key);
        // if (cachedResult) {
        //   const parsedCache = JSON.parse(cachedResult);
        //   const cleanPath = path.replace('$.', '').replace('$', '');
        //   const pathValue = cleanPath ? _.get(parsedCache, cleanPath) : parsedCache;
        //   if (pathValue !== undefined) {
        //     returnValue = JSON.stringify(pathValue);
        //   }
        // }

        // if (!returnValue) {
          let redisResult = await redis.call('JSON.GET', key, path);
          if (redisResult) {
            returnValue = redisResult;
          } 
        // }
      } else {
        throw 'client not found';
      }
      return returnValue;
    } catch (error) {
      throw error;
    }
  }

  async AppendJsonArr(key: string, value: any,collectionName:string, path?: string) {
    try {
      if(path){
        var request = await redis.call('JSON.ARRAPPEND', key, '$.'+path, value)
      }else{
        var request = await redis.call('JSON.ARRAPPEND', key, '$', value)
      }
      
      return request;

    } catch (error) {
      throw error
    }
  }
  

  //To store JSON data in redis
  /**
   * Stores JSON data in Redis.
   * @param key The key used to identify the JSON data in Redis.
   * @param value The JSON data to be stored.
   * @param path The path to the specific JSON value within the JSON data.
   * @returns A string indicating that the value was stored.
   * @throws {Error} If there is an error storing the JSON data.
   */
   async setJsonData(key: string, value: any, loginId: string, path?: string) { 
    try {
      if (!loginId || !key || !value) throw "loginId/key/value not found";  
            
        const parts = key.split(":");
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        requiredMarkers.forEach(marker => {
          const idx = parts.indexOf(marker);
          if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === "undefined" || parts.length <= 14) {
            throw new Error(`Invalid Redis key`);
          }
        });
        
        let pg_response
         const defpath = path ? `.${path}` : "$";
         pg_response = await redis.call("JSON.SET", key, defpath, value);
         if(pg_response == 'Value Stored') {
        if(key.includes(':FNGK:AF:')){
            await this.setPgData(loginId,key,value,path)
        }
        } 
         if(pg_response == 'Value Stored')
          return 'Value Stored'
              
            
    } catch (error) {
      console.log('error',error);
          
      throw error;
    }
  }

  async setIfNotExist(key:string,value:any,ttl:any){
    try {
      return await redis.set(key, value, 'PX', ttl, 'NX');
    } catch (error) {
      throw error;
    }
  }
  
  async setJsonDataBatch(
    operations: Array<{ key: string; value: any; path?: string }>,
    collectionName: string
  ): Promise<void> {
    try {
      if (!collectionName) throw new Error('client not found');
      if (!operations || operations.length === 0) return;

      // Validate all keys first
      for (const op of operations) {
        const parts = op.key.split(':');
        const requiredMarkers = ['CK', 'FNGK', 'FNK', 'CATK', 'AFGK', 'AFK', 'AFVK'];
        requiredMarkers.forEach(marker => {
          const idx = parts.indexOf(marker);
          if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === 'undefined' || parts.length <= 14) {
            throw new Error(`Invalid Redis key: ${op.key}`);
          }
        });
      }

      // Update CACHE_MANAGER for all operations
      // for (const op of operations) {
      //   if (op.path) {
      //     let existingValue = await this.cacheManager.get<string>(op.key);
      //     let parsedValue = existingValue ? JSON.parse(existingValue) : {};
      //     _.set(parsedValue, op.path, JSON.parse(op.value));
      //     await this.cacheManager.set(op.key, JSON.stringify(parsedValue));
      //   } else {
      //     await this.cacheManager.set(op.key, op.value);
      //   }
      // }

      // Create Redis pipeline
      const pipeline = redis.pipeline();

      // Add all operations to pipeline
      for (const op of operations) {
        const defpath = op.path ? `.${op.path}` : '$';
        pipeline.call('JSON.SET', op.key, defpath, op.value);
      }

      // Execute pipeline (single network round-trip)
      const results = await pipeline.exec();

      // Check for errors
      if (results) {
        for (let i = 0; i < results.length; i++) {
          const [error, result] = results[i];
          if (error) {
            throw new Error(`Pipeline command ${i} failed: ${error.message}`);
          }
        }
      }

      // WRITE-BEHIND: Fire-and-forget MongoDB operations
      // Don't await - let them process in background via batched queue
      // Promise.all(
      //   operations.map(op =>
      //     this.writeBehindBuffer.addOperation({
      //       type: 'SET_DOCUMENT',
      //       collectionName,
      //       key: op.key,
      //       value: JSON.parse(op.value),
      //       path: op.path,
      //     })
      //   )
      // ).catch(err => {
      //   console.error('Batch write-behind queue error:', err.message);
      // });

    } catch (error) {
      console.error('Batch setJsonData error:', error);
      throw error;
    }
  }

  //To store Stream data in redis
 /**
   * Stores stream data in Redis.
   * @param streamName The name of the Redis stream.
   * @param key The key used to identify the stream data.
   * @param strValue The stream data to be stored.
   * @returns The ID of the added message.
   * @throws {Error} If there is an error storing the stream data.
   */

  async setStreamData(streamName: string, key: string, strValue: any) {
    try {   
      streamName = streamName?.trim()  
      if(streamName && streamName != '' && key && strValue) {
        var result = await redis.xadd(streamName, '*', key, strValue);
       if(result){     
        await redis.call('EXPIRE', key, 86400);
       } 
      return result;
      }
      
    } catch (error) {
      throw error;
    }
  }

  async hset(hashName,field, value){
    try {
      return await redis.hset(hashName, field, value)
    } catch (error) {
      throw error;
    }
  }

  async hget(hashName,field){
    try {
      return await redis.hget(hashName,field);
    } catch (error) {
      throw error
    }
  }

  /**
   * Checks if a key exists in Redis.
   * @param key The key to check in Redis.
   * @returns The result of the EXISTS command (0 or 1).
   * @throws {Error} If there is an error executing the EXISTS command.
   */

  async exist(key,collectionName: string) {
    try {
     
      if(collectionName){ 
        let redisResult = await redis.call('EXISTS', key);
        if(redisResult){
          return redisResult;
        }else{
          return await this.isExist(key)
        }
       
      }else{
        throw 'client not found'
      }
    } catch (error) {
      throw error;
    }
  }


  async quit(){
     await redis.quit();
  }
 
   /**
   * Retrieves stream data from Redis.
   * @param streamName The name of the Redis stream.
   * @returns An array of messages in the stream.
   * @throws {Error} If there is an error retrieving the stream data.
   */
  
  async getStreamData(streamName) {
    try {
      var messages = await redis.xread('STREAMS', streamName, 0);     
      if(messages && messages != null){
        return messages;        
      }else{
        return await this.convertStreamStruct(streamName)
      }
    } catch (error) {
      throw error;
    }
  }


   /**
   * Retrieves stream data from Redis using XRANGE command.
   * 
   * @param {string} streamName - The name of the Redis stream.
   * @returns {Promise<string[][]>} - An array of messages in the stream.
   * @throws {Error} - If there is an error retrieving the stream data.
   */

   async getStreamRange(streamName,end?,start?){
    try {
      let messages;
      if(start && !end) 
        end = '+'
      if(end && !start)
        start = '-'
       if(end && start){
       messages = await redis.call('XRANGE', streamName, start, end);
       }else
         messages = await redis.call('XRANGE', streamName, '-', '+');
      // if(messages?.length == 0){    
      //   return await this.convertStreamRangeStruct(streamName)
      // }else{
        return messages;
      // }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves stream data from Redis using XREVRANGE command.
   * 
   * @param {string} streamName - The name of the Redis stream.
   * @param {number} count - The number of messages to retrieve.
   * @returns {Promise<string[][]>} - An array of messages in the stream.
   * @throws {Error} - If there is an error retrieving the stream data.
   */
   async getStreamRevRange(streamName, end?,start?,count?) {
    try {    
      if(end && start){
        var messages = await redis.xrevrange(streamName,end, start,'COUNT',count);
      }else{
        var messages = await redis.xrevrange(streamName,'+', '-', 'COUNT',count);
      }
      return messages;
    } catch (error) {
      throw error;
    }
  }
  
  //Retrieves stream data from Redis with count
  /**
   * Retrieves stream data from Redis with count.
   * 
   * @param {number} count - The number of messages to retrieve.
   * @param {string} streamName - The name of the Redis stream.
   * @returns {Promise<string[][]>} - An array of messages in the stream.
   * @throws {Error} - If there is an error retrieving the stream data.
   */
  async getStreamDatawithCount(count, streamName) {
    try {
      var messages = await redis.xread(
        'COUNT',
        count,
        'STREAMS',
        streamName,
        0,
      );
      return messages;
    } catch (error) {
      throw error;
    }
  }

  //To create a consumer group for a given stream in Redis
  /**
   * Creates a consumer group for a given stream in Redis.
   *
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @returns {Promise<string>} - A promise that resolves to a string indicating the consumer group was created.
   * @throws {Error} - If there is an error creating the consumer group.
  */
    async createConsumerGroup(streamName, groupName) {
    try {
      // Check if the consumer group already exists
      const grpInfo = await redis.xinfo('GROUPS', streamName).catch(() => []);

      // Check if the group name already exists in any of the groups
      const groupExists = grpInfo.some((group, index) => {
        // Group info comes as flat array: [name, value, name, value, ...]
        // 'name' field is at index 1, 5, 9, etc. for each group
        if (Array.isArray(group)) {
          return group.includes(groupName);
        }
        // Check if this is the 'name' field with matching value
        return index % 2 === 1 && group === groupName;
      });

      if (!groupExists) {
        await redis.xgroup('CREATE', streamName, groupName, '0', 'MKSTREAM');
        return `consumerGroup was created as ${groupName}`;
      }

      return `consumerGroup ${groupName} already exists`;
    } catch (error:any) {
      // If error is BUSYGROUP, the group already exists - this is okay
      if (error.message && error.message.includes('BUSYGROUP')) {
        return `consumerGroup ${groupName} already exists`;
      }
      throw error;
    }
  }

  //To create a consumer within a consumer group in Redis
  /**
   * Creates a consumer within a consumer group in Redis.
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @param {string} consumerName - The name of the consumer.
   * @returns {Promise<string>} - A promise that resolves to a string indicating the consumer was created.
   * @throws {Error} - If there is an error creating the consumer.
   */
  async createConsumer(streamName, groupName, consumerName) {
    try {
      var result = await redis.xgroup(
        'CREATECONSUMER',
        streamName,
        groupName,
        consumerName,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  //To reads messages from a Redis stream for a specific consumer group.
  /**
   * Reads messages from a Redis stream for a specific consumer group.
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @param {string} consumerName - The name of the consumer.
   * @returns {Promise<Array>} - A promise that resolves to an array of objects containing the message ID and data.
   * @throws {Error} - If there is an error reading the messages.
   */
  async readConsumerGroup(streamName, groupName, consumerName) {
    try {     
      var res = [];
      var result = await redis.xreadgroup('GROUP',groupName,consumerName,'STREAMS',streamName,'>');
      
      if (result) {
        result.forEach(([key, message]) => {
          message.forEach(([messageId, data]) => {           
            var obj = {};
            obj['msgid'] = messageId;
            obj['data'] = data;
            res.push(obj);
          });
        });
        return res;
      } else {
        return 'No Data available to read';
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Acknowledges a message in a Redis stream using the XACK command.
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @param {string} msgId - The message ID to acknowledge.
   * @returns {Promise<string>} - A promise that resolves to the result of the XACK command.
   * @throws {Error} - If there is an error acknowledging the message.
   */
  async ackMessage(streamName, groupName, msgId) {
    try {
      let result = await redis.xack(streamName, groupName, msgId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteWithEntryId(streamName, msgId) {
    try {      
      return await redis.call('XDEL',streamName,msgId) 
    } catch (error) {
      throw error;
    }
  }



   /**
   * Retrieves information about a consumer group in Redis.
   * @param {string} groupName - The name of the consumer group.
   * @returns {Promise<Array>} - A promise that resolves to an array of information about the consumer group.
   * @throws {Error} - If there is an error retrieving the information.
   */
  async getInfoGrp(groupName){
    try {     
      let result = await redis.xinfo('GROUPS', groupName);   
      return result
    } catch (error) {
      throw error;
    }
  }

  //To acknowledge a message in a Redis stream
  /**
   * Retrieves all keys in Redis that match a given pattern.
   * @param {string} key - The pattern to match against Redis keys.
   * @returns {Promise<Array>} - A promise that resolves to an array of keys that match the pattern.
   * @throws {Error} - If there is an error retrieving the keys.
   */
  
  async getKeys(key: string , collectionName: string, isKeySuffix = false) {
    try {
       let redisKey
       
       if (key && collectionName) {
         if (key.endsWith(':')) redisKey = isKeySuffix ? '*:' + key : key + '*';
         else redisKey = isKeySuffix ? '*:' + key : key + ':*';

         const parts = key.split(':').map((p) => p.trim());
         const KeyrequiredMarkers = [
           'CK',
           'FNGK',
           'FNK',
           'CATK',
           'AFGK',
           'AFK',
           'AFVK',
         ];
         KeyrequiredMarkers.forEach((marker) => {
           const idx = parts.indexOf(marker);
           if (parts[idx + 1] === 'undefined' || parts[idx + 1] === '') {
             throw new Error(`Invalid Redis key`);
           }
         });

         let keys = await redis.keys(redisKey);
         if (keys?.length > 0) {
           return keys;
         } else {
           return await this.getpgKeys(redisKey);            
         }
       } else {
         throw 'key/client not found';
       }
    } catch (error) {
      throw error;
    }
  }


  async scanKeys(pattern) {
    try {    
      let cursor = '0';
      const allKeys = [];
    
      do {
        const [nextCursor, keys] = await redis.scan(cursor,'MATCH',pattern,'COUNT',100);     
        cursor = nextCursor;
        allKeys.push(...keys);
      } while (cursor !== '0');
    
      return allKeys;
    } catch (error) {
      throw error
    }
  }
  
  /**
   * Deletes a key in Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>} - A promise that resolves when the key is deleted.
   * @throws {Error} - If there is an error deleting the key.
   */
  async deleteKey(key: any,collectionName: string) {
    try {     
      if(key && collectionName){     
        var response = await redis.del(key); 
        if(response){
          await this.deletePgKey(key)
          return response
        }
      }else{
       throw 'client not found'
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sets an expiration time for a Redis key.
   *
   * @param {string} key - The key to set the expiration time for.
   * @param {number} seconds - The number of seconds before the key expires.
   * @returns {Promise<number>} - A promise that resolves to the number of seconds
   * before the key expires, or 0 if the key does not exist.
   * @throws {Error} - If there is an error setting the expiration time.
   */
  async expire(key, seconds) {
    try {
      var result = await redis.call('EXPIRE', key, seconds);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async renameKey(oldKey, newKey,client) {
    try {
      // Update CACHE_MANAGER - move cached value from old key to new key
      // let cachedResult = await this.cacheManager.get<string>(oldKey);
      // if (cachedResult) {
      //   await this.cacheManager.set(newKey, cachedResult);
      //   await this.cacheManager.del(oldKey);
      // }

      var result = await redis.call('RENAME', oldKey, newKey);
      // Queue MongoDB operations
      // let mongoResult = await queueMongoOperation(
      //   () => this.existsDocument(client, oldKey),
      //   `existsDocument:${oldKey}`
      // );
      // if(mongoResult){
      //   await queueMongoOperation(
      //     () => this.renameDocumentId(client, oldKey, newKey),
      //     `renameDocumentId:${oldKey}`
      //   );
      // }
      return result;
    } catch (error) {
      throw error;
    }
  }  

  async getstreamKey(key: string) {
    try {
      let keys
       keys = await redis.keys(key); 
      if(keys?.length == 0){
        keys = await this.getDocumentKeys(key)
      }
      return keys;
    } catch (error) {
      throw error;
    }
  }


   async sethash(records,key){
    try {
      const totalBatches = Math.ceil(records.length / this.BATCH_SIZE);
      let storedCount = 0;

      for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
        const start = batchNum * this.BATCH_SIZE;
        const end = Math.min(start + this.BATCH_SIZE, records.length);
        const batch = records.slice(start, end);

        const pipeline = redis.pipeline();

        batch.forEach((record, index) => {
          const globalIndex = start + index;
          pipeline.hset(
            key+':'+batchNum,
            globalIndex.toString(),
            JSON.stringify(record)
          );
        });
        await pipeline.exec();
      }

      await redis.set( key+':total', records.length);
      await redis.set(key+':batches', totalBatches);
    } catch (error) {
      throw error
    }
  }


    async getAllRecordshash(key): Promise<any[]> {
   //const total = parseInt(await redis.get('records:total') || '0');
    const totalBatches = parseInt(await redis.get(key+':batches') || '0'); 
    // if (total === 0) {
    //   return [];
    // }    
    const allRecords: any[] = [];    
    for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
      const batchData: Record<string, string> = await redis.hgetall(
       key+':'+batchNum
      );      
      const batchRecords = Object.values(batchData).map(value => 
        JSON.parse(value)
      );      
      allRecords.push(...batchRecords);
      console.log(`Loaded batch ${batchNum + 1}/${totalBatches}`);
    }
    
    return allRecords;
  }

 
  //------------------------ MONGO DB ----------------------------//

  async setDocument(collectionName: string, key: string, value: any,path?:any,filter?:object){
    try {
      if(key && collectionName){
        let collection;
        if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
          collection = db.collection('TORUS_AMDKEYS'); 
        else
          collection = db.collection(collectionName+'_AMDKEYS');
 
        let customId:any = { _id:key}
      
        let customVal:any = { $set: { value } }      
      
        if(filter)    
          customId = Object.assign(customId,filter) 

        if(path){
          if(path.includes('[') && path.includes(']')){ 
            path = path.replace(']', '');
            path = path.replace('[', '');
          }
          path = 'value.'+path
          customVal = { $set: { [path]:value } }
        }
      
        var result = await collection.findOneAndUpdate(customId,customVal,{ upsert: true, returnDocument: 'after' })
    
        if (result) {
          return result
        } else {
          return 0
        }
      }else{
        throw 'key/client not found'
      }      
    } catch (error) {
      throw error
    }
  }  

  async getDocumentKeys(collectionName: string, key?: string){
    try {
      if (!collectionName) throw 'client not found';
      let collection;
      let result
      if (key) {
        if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
          collection = db.collection('TORUS_AMDKEYS'); 
        else
          collection = db.collection(collectionName+'_AMDKEYS');

        const parts = key.split(":").map(p => p.trim());
        const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        KeyrequiredMarkers.forEach(marker => {
          const idx = parts.indexOf(marker);
          if (parts[idx + 1] === "undefined" || parts[idx + 1] === '') {
            throw new Error(`Invalid Redis key: missing value for ${marker}`);
          }
        });
      
        if (key.includes(':*:')) {
          key = key.replaceAll(':*', '.*?')
        }
        result = await collection.find({ _id: { $regex: (`${key}`) } }).toArray();
      }
      else {
        collection = db.collection(collectionName);
        result = await collection.find().toArray();
      }  
        
      let arrID=[]
      if (result && result.length>0) {       
        const arrID: string[] = [];
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        for (const item of result) {
          const _id = item?._id;
          if (!_id || typeof _id !== "string") continue;

          const parts = _id.split(":").map(p => p.trim());         
        
          let isValid = true;  
          for (const marker of requiredMarkers) {
            const idx = parts.indexOf(marker);
            const next = parts[idx + 1];  
            if (idx === -1 ||next === undefined ||next === null ||next.trim?.() === "" ||next.toLowerCase?.() === "undefined" || parts.length <= 14) {
              isValid = false;
              await this.deleteKey(_id,collectionName)
              break;
            }
          }

          if (isValid && !arrID.includes(_id)) {
            arrID.push(_id);
          }                  
        }
        return arrID
      } else {
        return arrID
      }
    } catch (error) {
      throw error
    }
  }

  async getDocument(collectionName: string, key: string, path?:any,filter?:object){
    try {
      if(!collectionName)  throw 'client not found'
      let collection;
      if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        collection = db.collection('TORUS_AMDKEYS'); 
      else
        collection = db.collection(collectionName+'_AMDKEYS');
     
      const parts = key.split(":").map(p => p.trim());
      const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
      KeyrequiredMarkers.forEach(marker => {
        const idx = parts.indexOf(marker);
        if (parts[idx + 1] === "undefined" || parts[idx + 1] === '' || parts.length <= 14) {
          throw new Error(`Invalid Redis key: missing value for ${marker}`);
        }
      });

      // ✅ PERFORMANCE FIX: Use exact match instead of case-insensitive regex
      // Regex queries with 'i' flag can't use indexes efficiently and cause 10-30 second delays
      let customId:any = {
        _id: key  // Exact match - uses index, completes in milliseconds
      }

      var result = await collection.find(customId).toArray();  
     // console.log(1,JSON.stringify(result));     
      if (result?.length>0) { 
        const arrID: string[] = [];
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        for (const item of result) {
          const _id = item?._id;
          if (!_id || typeof _id !== "string") continue;
          const parts = _id.split(":").map(p => p.trim());  
          let isValid = true;  
          for (const marker of requiredMarkers) {
            const idx = parts.indexOf(marker);
            const next = parts[idx + 1];  
            if (idx === -1 ||next === undefined ||next === null ||next.trim?.() === "" ||next.toLowerCase?.() === "undefined" || parts.length <= 14) {
              isValid = false;
              await this.deleteKey(_id,collectionName)
              break;
            }
          }

          if (isValid) {//&& !arrID.includes(_id)
            arrID.push(item);
          }                  
        }       
        
        if(arrID.length>0) result = arrID
              
        if(path){   
          return await _.get(result?.[0],'value'+path)         
        }
        return result
      } else {
        return 0
      }
    } catch (error) {
      throw error
    }
  }

  async getCollection(collectionName: string){
    try {     
      const collection = db.collection(collectionName+'_AMDKEYS'); 
      var result = await collection.find().toArray();  
       
      if (result?.length>0) { 
        return result
      } else {
        return 0
      }
    } catch (error) {
      throw error
    }
  }

  async listCollections(collectionName?:string){
    try {
      let collections = []
      let collectionList = await db.listCollections().toArray();
      collectionList.forEach(collection => {
        if(collectionName){
          if(collection.name.includes(collectionName)){
            collections.push(collection.name);
          }
        }else{
          collections.push(collection.name);
        }
      });
      if(collections.length > 0){
        return collections
      }else{
        return 0
      }
    } catch (error) {
      throw error
    }
  }

  async existsDocument(collectionName: string, key: string){
    try {  
      if(!collectionName) throw 'client not found'    
      let collection;
      if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        collection = db.collection('TORUS_AMDKEYS'); 
      else
        collection = db.collection(collectionName+'_AMDKEYS');

      let customId:any = {_id:key}  
     
      var result = await collection.findOne(customId,{ projection: { _id: 1 } })   
       
      if (result) {
        return result
      } else {
        return 0
      }
    } catch (error) {
      throw error
    }
  }

  async appendDocumentData(collectionName: string, key: string,AppendValue:any){
    try {
      if(!collectionName)  throw 'client not found'
       let collection;
      if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        collection = db.collection('TORUS_AMDKEYS'); 
      else
        collection = db.collection(collectionName+'_AMDKEYS');

      let customId:any = {_id:key}

      var result:any = await collection.find(customId).toArray()
     
      if(result?.length>0){                
        let pushQry = { $push: { ['value'] : AppendValue } }               
        return await collection.updateOne(customId, pushQry);             
      }else{  
        return await this.setDocument(collectionName,key,[AppendValue])
      }

    } catch (error) {
      throw error
    }
  }

  async appendStreamDocument(collectionName: string, key: string,AppendValue:any){
    try {
      const collection:any = db.collection(collectionName); 
      let customId:any = {_id:key}

      var result:any = await collection.find(customId).toArray()
     
      if(result?.length>0){                
        let pushQry = { $push: { ['value'] : AppendValue } }
               
        return await collection.updateOne(customId, pushQry);
             
      }else{  
        return await this.setStreamDocument(collectionName,key,[AppendValue])
      }

    } catch (error) {
      throw error
    }
  }

  async setStreamDocument(collectionName: string, key: string, value: any,path?:any,filter?:object){
    try {
     
      const collection = db.collection(collectionName);
 
      let customId:any = { _id:key}
     
      let customVal:any = { $set: { value } }      
     
      if(filter)    
        customId = Object.assign(customId,filter) 

      if(path){
        if(path.includes('[') && path.includes(']')){ 
          path = path.replace(']', '');
          path = path.replace('[', '');
        }
        path = 'value.'+path
        customVal = { $set: { [path]:value } }
      }
     
      var result = await collection.findOneAndUpdate(customId,customVal,{ upsert: true, returnDocument: 'after' })
   
      if (result) {
        return result
      } else {
        return 0
      }
    } catch (error) {
      throw error
    }
  }  

  async convertStreamStruct(collectionName){
    try {   
    const collection = db.collection(collectionName); 
    let docs: any =  await collection.find().toArray();  
      
    let FinalArr = [];  
    
    if (docs?.length > 0) {
      let EntryIdArr = []
      for (let d = 0; d < docs.length; d++) {
        let singleDoc = docs[d];
        let singleDocId = singleDoc._id;
        let singleDocValArr = singleDoc.value;

       
        for(let v = 0; v < singleDocValArr.length; v++){
          let fieldKeyArr = [];
          let EntryId = singleDocValArr[v].EntryId
          delete singleDocValArr[v].EntryId
      
          await redis.xadd(collectionName, EntryId, singleDocId, JSON.stringify(singleDocValArr[v]));

          fieldKeyArr.push(EntryId,[singleDocId,JSON.stringify(singleDocValArr[v])]);
        
          EntryIdArr.push(fieldKeyArr);
        }      

      }
      FinalArr.push([collectionName,EntryIdArr]);
      return FinalArr
     
    }

    } catch (error) {
      throw error
    }
  }

   async convertStreamRangeStruct(collectionName){
    try {   
    const collection = db.collection(collectionName); 
    let docs: any =  await collection.find().toArray(); 
    
    if (docs?.length > 0) {
      let EntryIdArr = []
      for (let d = 0; d < docs.length; d++) {
        let singleDoc = docs[d];
        let singleDocId = singleDoc._id;
        let singleDocValArr = singleDoc.value;

       
        for(let v = 0; v < singleDocValArr.length; v++){
          let fieldKeyArr = [];
          let EntryId = singleDocValArr[v].EntryId
          delete singleDocValArr[v].EntryId
      
          await redis.xadd(collectionName, EntryId, singleDocId, JSON.stringify(singleDocValArr[v]));

          fieldKeyArr.push(EntryId,[singleDocId,JSON.stringify(singleDocValArr[v])]);
        
          EntryIdArr.push(fieldKeyArr);
        }      
       
      }     
      return EntryIdArr
     
    }

    } catch (error) {
      throw error
    }
  }
   

 async renameDocumentId(collectionName: string,oldId: string,newId: string): Promise<string> {
  try {    
    const collection = db.collection<any>(collectionName +'_AMDKEYS');    
    const doc = await collection.findOne({ _id: oldId });
    if (!doc) {
      throw (`_id "${oldId}" not found`);
    }    
    doc._id = newId;
    await collection.insertOne(doc);  
    return newId;
  } catch (error) {
    throw error
  }
}


async deleteDocument(collectionName:string,key:any){
  try{
    if(!collectionName) throw 'client not found'
      let collection;
      if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        collection = db.collection('TORUS_AMDKEYS'); 
      else
        collection = db.collection(collectionName+'_AMDKEYS');

      let res = await collection.deleteOne({_id:key} )
      return res;
  }catch(err){
    throw err;
  }
}

async select(db: number) {
    return redis.select(db);
  }

  async scan(cursor: string, ...args: any[]) {
    return redis.scan(cursor, ...args);
  }

  async ttl(key: string) {
    return redis.ttl(key);
  }

  async type(key: string) {
    return redis.type(key);
  }

  async call(command: string, ...args: any[]) {
    return redis.call(command, ...args);
  }

  async get(key: string) {
    return redis.get(key);
  }

  async set(key: string, value: any) {
    return redis.set(key, value);
  }

  async del(key: string) {
    return redis.del(key);
  }

  

  async hgetall(key: string) {
    return redis.hgetall(key);
  }

  async lrange(key: string, start: number, stop: number) {
    return redis.lrange(key, start, stop);
  }

  async rpush(key: string, ...values: any[]) {
    return redis.rpush(key, ...values);
  }

  async smembers(key: string) {
    return redis.smembers(key);
  }

  async sadd(key: string, ...members: any[]) {
    return redis.sadd(key, ...members);
  }

  async zrange(key: string, start: number, stop: number, ...args: any[]) {
    return redis.zrange(key, start, stop, ...args);
  }

  async zadd(key: string, ...args: any[]) {
    return redis.zadd(key, ...args);
  }

  async dump(key: string) {
    return redis.dump(key);
  }

  async restore(key: string, ttl: number, value: Buffer, ...args: any[]) {
    return redis.restore(key, ttl, value, ...args);
  }

  async pexpire(key: string, ms: number) {
    return redis.pexpire(key, ms);
  }

  async exists(key: string) {
    return redis.exists(key);
  }

  async ping() {
    return redis.ping();
  }

  //__________________________PG_______________________________

  async setPgData(loginId:string,key: string, value:any,path?): Promise<any> {   
    const client = await this.getClient();
    try {
      const DbSchema = process.env.PG_URL.split('schema=')[1]//process.env.PG_SCHEMANAME || 'torus_amdKeys';
      if (!DbSchema || DbSchema.includes('<clientCode>')) throw ('PG schema not found')
      let tableName
      if(key){
        // if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        //   tableName = 'node_registry'
        // else
          tableName = 'tam_amd_registry'
      }
      const auditCols = [
        'full_key',
        'ck_code',
        'fngk_code',
        'fnk_code',
        'catk_code',
        'afgk_code',
        'afk_code',
        'afvk_code',
        'afsk_code',
        'data'
      ];

      const getTableColumns = async (tableName: string) => {
        const { rows } = await client.query(
          `SELECT column_name
         FROM information_schema.columns
         WHERE table_schema = $1 AND table_name = $2
         ORDER BY ordinal_position`,
          [DbSchema, tableName]
        );
        return rows.map(r => r.column_name);
      };

      const columns = await getTableColumns(tableName);
    
      const usableCols = columns.filter(col => auditCols.includes(col));
     
      const keys = key.split(':');
      if (keys.length <= 14) throw ('Invalid key')    
        
      const valueMap: any = {
        full_key: key,
        ck_code: keys[1],
        fngk_code: keys[3],
        fnk_code: keys[5],
        catk_code: keys[7],
        afgk_code: keys[9],
        afk_code: keys[11],
        afvk_code: keys[13],
        afsk_code: keys[14],
        data: value
      };

      const values = usableCols.map(col => valueMap[col] ?? null);

      const colList = usableCols.join(', ');
      const placeholders = usableCols.map((_, i) => `$${i + 1}`).join(', ');

      const updateSet = usableCols
        .filter(col => col !== 'full_key') // avoid updating conflict key
        .map((col, i) => `${col} = EXCLUDED.${col}`)
        .join(', ');

        let query = `
          INSERT INTO "${DbSchema}".${tableName}
          (${colList}, trs_created_by, trs_created_date, trs_modified_by, trs_modified_date)
          VALUES (${placeholders}, '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP)
          ON CONFLICT (full_key)
          DO UPDATE SET
            ${updateSet},
            trs_modified_by = '',
            trs_modified_date = CURRENT_TIMESTAMP
        `; 
        const result = await client.query(query, values);         
        if (result.rowCount > 0)
          return 'OK';
    } catch (error) {  
       resetPGClient();   
      throw error;
    } 
  }

  async getpgData(key){
    const client = await this.getClient();
    try {     
      let DbSchema = process.env.PG_URL.split('schema=')[1]//process.env.PG_SCHEMANAME || 'torus_amdKeys';
      if (!DbSchema || DbSchema.includes('<clientCode>')) throw ('PG schema not found')
      let tableName
      if(key){
        // if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        //   tableName = 'node_registry'
        // else
          tableName = 'tam_amd_registry'
      }
      const query = `
        SELECT data
        FROM "${DbSchema}".${tableName}
        WHERE full_key = $1
      `;

      const result = await client.query(query, [key]);
      if (!result?.rows[0]?.data) return null
      if(typeof result.rows[0].data == 'object')
        return JSON.stringify(result.rows[0].data)
      else
      return result.rows[0].data
    } catch (error) {
      console.log('error',error);
       resetPGClient();
      throw error
    } 
  }

  async getpgKeys(key){
     const client = await this.getClient();
    try {      
      let DbSchema = process.env.PG_URL.split('schema=')[1]//process.env.PG_SCHEMANAME || 'torus_amdKeys';
      if (!DbSchema || DbSchema.includes('<clientCode>')) throw ('PG schema not found')
      let tableName
      if(key){
         // if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        //   tableName = 'node_registry'
        // else
          tableName = 'tam_amd_registry'
      }
      key = key.replaceAll('*','%');
      let result = await client.query(
        `SELECT full_key from "${DbSchema}".${tableName} where full_key LIKE $1`,
        [`${key}%`]
      )
      let allApiKeys = result?.rows?.map(row => row.full_key) || []
      return allApiKeys
    } catch (error) {
       resetPGClient();
      throw error
    } 
  }

  async isExist(key){
     const client = await this.getClient();
    try {     
      let DbSchema = process.env.PG_URL.split('schema=')[1]//process.env.PG_SCHEMANAME || 'torus_amdKeys';
      if (!DbSchema || DbSchema.includes('<clientCode>')) throw ('PG schema not found')
      let tableName
      if(key){
        // if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        //   tableName = 'node_registry'
        // else
          tableName = 'tam_amd_registry'
      }
      const query = `
        SELECT EXISTS (
          SELECT 1
          FROM "${DbSchema}".${tableName}
          WHERE full_key = $1
        ) AS exists
      `;
      const result = await client.query(query, [key]);
      if (!result.rows[0].exists) return 0
      return 1
    } catch (error) {
       resetPGClient();
      throw error
    } 
  }

  async deletePgKey(key){
    const client = await this.getClient();
    try {     
      let DbSchema = process.env.PG_URL.split('schema=')[1]//process.env.PG_SCHEMANAME || 'torus_amdKeys';
      if (!DbSchema || DbSchema.includes('<clientCode>')) throw ('PG schema not found')
      let tableName
      if(key){
       // if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        //   tableName = 'node_registry'
        // else
          tableName = 'tam_amd_registry'
      }
      const query = `
        DELETE FROM "${DbSchema}".${tableName}
        WHERE full_key = $1
      `;

      const result = await client.query(query, [key]);
      if (!result?.rowCount) return 0
      return 1
    } catch (error) {
       resetPGClient();
      throw error
    } 
  }
  
}


