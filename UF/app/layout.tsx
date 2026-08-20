/* {
  "aKey": "CK:TGA:FNGK:BLDC:FNK:DEV:CATK:CT005:AFGK:GSS:AFK:RTGS:AFVK:v1:bldc",
  "ufKey": "Logs Screen",
  "screenName": "logs",
  "screenLabel": "logs",
  "navbarData": [
    {
      "menuGroup": "admin",
      "menuGroupLabel": "Admin",
      "screenDetails": [
        {
          "name": "logs",
          "label": "Logs",
          "key": "Logs Screen",
          "restrictedAccessProfile": [],
          "static": true,
          "icon": "https://tdps3api.toruslowcode.com/torus/9.1/resources/icons/document-add-svgrepo-com.svg"
        },
        {
          "name": "user",
          "label": "User",
          "key": "User Screen",
          "restrictedAccessProfile": [],
          "static": true,
          "icon": "https://tdps3api.toruslowcode.com/torus/9.1/resources/icons/user-plus-svgrepo-com.svg"
        }
      ],
      "items": [],
      "icon": "https://tdps3api.toruslowcode.com/torus/9.1/resources/icons/admin-svgrepo-com.svg"
    },
    {
      "menuGroupLabel": "Transactions",
      "screenDetails": [
        {
          "name": "transactions",
          "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1",
          "restrictedAccessProfile": [],
          "static": false
        }
      ],
      "items": []
    },
    {
      "menuGroupLabel": "Simulator",
      "screenDetails": [
        {
          "name": "simulator",
          "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1",
          "restrictedAccessProfile": [],
          "static": false
        }
      ],
      "items": []
    }
  ],
  "setupData": {
    "appInfo": {
      "code": "RTGS",
      "name": "RTGS",
      "appLogo": "torus/9.1/CT005/resources/images/White global payment hub.png",
      "accessUrl": "https://tgaprod910.toruslowcode.com/ct005/gss/rtgs/v1",
      "encryption": {
        "type": ""
      },
      "lastBuildOn": "2026-07-30T05:32:59.339Z",
      "lastBuildVersion": "v1",
      "applicationUniqueId": "ae093d5d-f44a-444b-afab-9476f31e7dca",
      "deploymentArtifactKey": "CK:CT005:FNGK:AF:FNK:CDF-DPD:CATK:GSS:AFGK:RTGS:AFK:RTGS_DPD:AFVK:v1",
      "appGrpName": "GSS",
      "appGrpCode": "GSS",
      "fusionAuthAppClientSecret": "AKE3Mkrdhezw9vln9mTV-Wnb8WVEivZ3BY0KTxqtmbc",
      "localization": {
        "datetime": {
          "display": {
            "date": {
              "value": "YYYY-MM-DD"
            },
            "time": {
              "value": "hh:mm:ss a"
            }
          },
          "timezone": {
            "name": {
              "value": "Asia/Kolkata"
            },
            "offset": {
              "value": "+05:30"
            },
            "abbreviation": {
              "value": "IST"
            },
            "is_dst": {
              "value": false
            }
          }
        },
        "currency": {
          "display": {
            "currency": "",
            "symbol": "",
            "decimal_separator": ".",
            "thousands_separator": ",",
            "grouping_rules": [
              3
            ],
            "decimal_places": 0
          },
          "rounding_rules": {
            "rule": 3
          }
        },
        "legal_and_compliance": {
          "privacy": {
            "regulations": {
              "GDPR": {
                "regions": [
                  "EU",
                  "EEA",
                  "UK"
                ],
                "consent_required": false,
                "right_to_erasure": false,
                "data_portability": false,
                "dpo_required": false,
                "breach_notification_hours": 72
              },
              "CCPA": {
                "regions": [
                  "US-CA"
                ],
                "opt_out_sale": false,
                "right_to_know": false,
                "right_to_delete": false
              },
              "LGPD": {
                "regions": [
                  "BR"
                ],
                "consent_required": false,
                "data_subject_rights": false
              },
              "PIPL": {
                "regions": [
                  "CN"
                ],
                "data_localization": false,
                "cross_border_transfer_restricted": false
              },
              "PDPA": {
                "regions": [
                  "TH",
                  "MY",
                  "SG"
                ],
                "consent_required": false
              }
            }
          }
        }
      }
    },
    "tenantAppearancekey": "CK:TGA:FNGK:SETUP:FNK:SF:CATK:TENANT:AFGK:CT005:AFK:PROFILE:AFVK:v1:appearance",
    "selectedPresetKey": "default",
    "appBackgroundImage": "torus/9.1/CT005/resources/images/Home.png",
    "direction": "LTR",
    "brandColor": "#0737c9",
    "selectionColor": "#579eff",
    "hoverColor": "#d5eeff",
    "borderRadius": "m",
    "sidebarStyle": "",
    "navigationStyles": "horizontal",
    "theme": "light",
    "layoutMode": "detached",
    "mobileAppearance": {
      "language": "English",
      "direction": "LTR",
      "theme": "light",
      "brandColors": {
        "primary": "#0025dd",
        "secondary": "#000e51",
        "tertiary": "#000000"
      },
      "accentColors": {
        "accentOne": "#f4f5ff",
        "accentTwo": "#ffffff"
      },
      "utilityColors": {
        "lightMode": {
          "primaryText": "#14181b",
          "secondaryText": "#57636c",
          "primaryBackground": "#f1f4f8",
          "secondaryBackground": "#ffffff"
        },
        "darkMode": {
          "primaryText": "#ffffff",
          "secondaryText": "#95a1ac",
          "primaryBackground": "#1d2428",
          "secondaryBackground": "#14181b"
        }
      },
      "fontSize": {
        "displayLarge": "64",
        "displayMedium": "44",
        "displaySmall": "36",
        "headlineLarge": "32",
        "headlineMedium": "28",
        "headlineSmall": "24",
        "titleLarge": "20",
        "titleMedium": "18",
        "titleSmall": "16",
        "labelLarge": "16",
        "labelMedium": "14",
        "labelSmall": "12",
        "bodyLarge": "16",
        "bodyMedium": "14",
        "bodySmall": "12"
      },
      "fontFamily": "Roboto",
      "navigationStyle": "Bottom Navigation",
      "drawerStyle": ""
    },
    "language": "English",
    "fontFamily": [
      {
        "label": "Inter",
        "fontUrl": "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&d…"
      }
    ],
    "text-body-font": "Inter",
    "text-header-font": "Inter",
    "text-display-font": "Inter",
    "name": "default",
    "fontSize": {
      "minPx": "6",
      "preferredVw": "0.85",
      "maxPx": "12"
    }
  },
  "setupKey": "CK:TGA:FNGK:SETUP:FNK:SF:CATK:CT005:AFGK:GSS:AFK:RTGS:AFVK:v1:appearance",
  "allKeys": [
    "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1",
    "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1"
  ],
  "loginDetails": {
    "firstName": "Sam",
    "lastName": "M",
    "loginId": "sam",
    "email": "samm@gsstvl.com",
    "mobile": "",
    "status": "active",
    "accessProfile": [
      "Testing"
    ],
    "accessExpires": "2028-06-07",
    "dateAdded": "2026-03-09T11:01:57.190Z",
    "profile": "",
    "userUniqueId": "7f0f7b07-155a-4c52-b3b6-df722f11757e",
    "touring": {
      "isneedTouring": false,
      "touringData": {
        "/torus": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        }
      }
    },
    "lastActive": "2026-08-20T07:49:01.899Z",
    "client": "CT005",
    "users": "samSam M",
    "noOfProductsService": 0,
    "edit": ""
  },
  "webOnBoarding": {
    "navBarStyle": {
      "activeItems": [
        {
          "name": "app logo",
          "gridColumn": "1/3"
        },
        {
          "name": "menu items",
          "gridColumn": "3/8",
          "gridRow": "1/6"
        },
        {
          "name": "profile",
          "gridColumn": "12/13",
          "gridRow": "12/13"
        },
        {
          "name": "opr matrix",
          "gridColumn": "9/12",
          "gridRow": "6/9"
        }
      ],
      "deletedItems": [
        {
          "name": "logo",
          "gridColumn": "1/2"
        }
      ]
    },
    "landingScreen": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1",
    "loginType": "standard",
    "image": "torus/9.1/CT005/resources/images/Login 1.png"
  },
  "allKeyswithScreenNames": [
    {
      "screenName": "transactions",
      "screensName": "transactions-v1",
      "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:transactionProduct:AFVK:v1"
    },
    {
      "screenName": "simulator",
      "screensName": "simulator-v1",
      "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:simulatorProcessUi:AFVK:v1"
    }
  ],
  "deploymentArtifactKey": "CK:CT005:FNGK:AF:FNK:CDF-DPD:CATK:GSS:AFGK:RTGS:AFK:RTGS_DPD:AFVK:v1",
  "appGroupDesc": "GSS",
  "logType": "dfs",
  "appDesc": "RTGS",
  "appLogo": "torus/9.1/CT005/resources/images/White global payment hub.png",
  "isOld": true,
  "clientCode": "CT005"
} */
import './globals.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { GetSetupKey } from './utils/setUpKey';
import GlobalContext from './globalContext';
import { GlobalProvider } from '@/context/GlobalContext';
import { EventBusProvider } from '@/context/EventBusContext';
import { ThemeWrapper } from '@/components/ThemeWrapper';
import { cookies } from 'next/headers';
import { COOKIE_PREFIX } from '@/lib/cookies';

export const metadata: Metadata = {
  title: 'RTGS',
  description: 'RTGS Generated by Torus'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies();
  const tokenParam = cookieStore.get(`${COOKIE_PREFIX}_token`)?.value;
  console.log(tokenParam , "token param from layout");

  return (
    <html lang='en'>
      <body>
        <GlobalContext>
          <GlobalProvider tokenParam={tokenParam ?? ""}>
            <EventBusProvider>
              <ThemeWrapper>
                  <GetSetupKey>{children}</GetSetupKey>
              </ThemeWrapper>
            </EventBusProvider>
          </GlobalProvider>
        </GlobalContext>
      </body>
    </html>
  )
}