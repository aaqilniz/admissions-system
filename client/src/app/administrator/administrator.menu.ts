
var A_M = [
    {
      path: 'admin',
      children: [
        {
          path: 'dashboard',
          data: {
            menu: {
              title: 'general.menu.dashboard',
              icon: 'ion-android-home',
              selected: false,
              expanded: false,
              order: 0
            }
          },
          children:[]
        },
        {
            path: 'settings',
            data: {
              menu: {
                title: 'Settings',
                icon: 'fa fa-cog',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: 'app-verify-application',
            data: {
              menu: {
                title: 'Fee Verification',
                icon: 'fa fa-check',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: 'app-print-application',
            data: {
              menu: {
                title: 'Print Applicaion',
                icon: 'fa fa-print',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: 'modifyApplication',
            data: {
              menu: {
                title: 'Modify Applicaion',
                icon: 'fa fa-pencil',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Manual Form',
                icon: 'fa fa-clipboard',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: 'reportcenter',
            data: {
              menu: {
                title: 'Report Center',
                icon: 'ion-document-text',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: 'FeeVerification',
            data: {
              menu: {
                title: 'Fee Verify',
                icon: 'ion-calculator',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: 'entrytest',
            data: {
              menu: {
                title: 'Entry Test',
                icon: 'ion-ios-book-outline',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          },
          {
            path: 'meritmanager',
            data: {
              menu: {
                title: 'Manage Merit',
                icon: 'ion-ribbon-b',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children:[]
          }
      ]
    }
  ];
  export var ADMIN_MENU = A_M;
  