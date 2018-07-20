const items = {};

class BulkLoader {
  static loadJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const onJSONLoadingCompleted = () => {
        xhr.removeEventListener('load', onJSONLoadingCompleted);
        xhr.removeEventListener('error', onError);
        if (xhr.readyState === 4 && xhr.status === 200) {
          items[url] = {
            data: xhr.response
          };
          resolve(xhr.response);
        }
      };

      const onError = error => {
        xhr.removeEventListener('load', onJSONLoadingCompleted);
        xhr.removeEventListener('error', onError);
        reject(error);
      };

      xhr.addEventListener('load', onJSONLoadingCompleted);
      xhr.addEventListener('error', onError);
      xhr.responseType = 'json';
      xhr.open('get', url, true);
      xhr.send();
    });
  }
}
export default BulkLoader;
