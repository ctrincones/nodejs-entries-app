
export const makePostRequest = function (url,data) {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url,true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const dataObject = {
          token: xhr.getResponseHeader("x-auth"),
          data: xhr.response
        };
        resolve(dataObject);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  });
}
