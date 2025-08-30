import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt9QHFqVkJrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQlpjTn9Qck1jWH1XeXM=;Mgo+DSMBPh8sVXJ2S0d+X1VPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXlTcURgXXdecXdUQWc=;ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdkJiWntWcHVWRWRb;NRAiBiAaIQQuGjN/V0R+XU9HclRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TcUVkWHxaeHRURWVYVg==;Mgo+DSMBMAY9C3t2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdkJiWntWcHVWQWNb;MjU1NDMwNUAzMjMyMmUzMDJlMzBrcmlNSzU4aWpOUGV5K1g4eXQvOTN4V2cyQjlKeEpHVk1JSlhpRWNDUGowPQ==;MjU1NDMwNkAzMjMyMmUzMDJlMzBLRXp6K0R4dy93WWcyNjNpZG5PNUR2U0NvT1F3Z2RsY1J6NStZVnRURG5rPQ==');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
