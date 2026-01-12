import { HttpContextToken } from '@angular/common/http';

export const LOADING_ANIMATION = new HttpContextToken(() => true);
export const RETRY_COUNT = new HttpContextToken(() => 1);
