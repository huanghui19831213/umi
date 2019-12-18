import { storageEnhancer } from './utils/dva-redux-persist';
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    
    extraEnhancers: [
      storageEnhancer({
        whitelist: ['token']
      })
    ]
  },
  
  plugins: [
    require('dva-logger')(),
  ]
};
