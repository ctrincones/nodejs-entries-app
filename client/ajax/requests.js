
export const makePostRequest = function (url,data) {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url,true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const dataObject = {
          data: xhr.response
        };
        if(xhr.getResponseHeader("x-auth")){
          dataObject.token = xhr.getResponseHeader("x-auth");
        }
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

export const makeGetRequestWithToken = function (url,token) {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const dataObject = {
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
    if(token){
      xhr.setRequestHeader("x-auth", token);
    }
    xhr.send();
  });
}

export const makeDeleteRequestWithToken = (url,token) => {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const dataObject = {
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
    xhr.setRequestHeader("x-auth", token);
    xhr.send();
  });
}

export const makePostRequestWithToken = function (url,data,token) {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url,true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const dataObject = {
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
    xhr.setRequestHeader("x-auth", token);
    if(data){
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

export const makeGetRequest = function (url) {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const dataObject = {
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
    xhr.send();
  });
}


export const makePatchRequestWithToken = function (url,data,token) {
  return new Promise( function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", url,true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const dataObject = {
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
    xhr.setRequestHeader("x-auth", token);
    if(data){
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}
