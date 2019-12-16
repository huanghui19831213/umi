import { storageEnhancer } from './utils/dva-redux-persist';
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    
    extraEnhancers: [
      storageEnhancer({
        whitelist: ['login']
      })
    ]
  },
  
  plugins: [
    require('dva-logger')(),
  ]
};
