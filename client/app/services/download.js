'use strict';

angular.module('chemartApp')
  .factory('$download', function () {

    return function (data, strFileName, strMimeType) {

      var u = "application/octet-stream",
        mimeType = strMimeType || u,
        D = document,
        a = D.createElement("a"),
        stringify = function (a) {
          return String(a);
        },
        B = (window.Blob || window.MozBlob || window.WebKitBlob || stringify);

      B = B.call ? B.bind(window) : Blob;

      var fn = strFileName || "download",
        blob,
        fr;

      if (String(data).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
        return navigator.msSaveBlob ? navigator.msSaveBlob(d2b(data), fn) : saver(data);
      }

      blob = data instanceof B ? data : new B([data], {type: mimeType});


      function d2b(u) {
        var p = u.split(/[:;,]/),
          t = p[1],
          dec = p[2] == "base64" ? atob : decodeURIComponent,
          bin = dec(p.pop()),
          mx = bin.length,
          i = 0,
          uia = new Uint8Array(mx);

        for (i; i < mx; ++i) {
          uia[i] = bin.charCodeAt(i);
        }

        return new B([uia], {type: t});
      }

      function saver(url, winMode) {

        if ('download' in a) { //html5 A[download]
          a.href = url;
          a.setAttribute("download", fn);
          a.innerHTML = "downloading...";
          D.body.appendChild(a);
          setTimeout(function () {
            a.click();
            D.body.removeChild(a);
            if (winMode === true) {
              setTimeout(function () {
                window.URL.revokeObjectURL(a.href);
              }, 250);
            }
          }, 66);
          return true;
        }

        if (typeof safari !== "undefined") { // handle non-a[download] safari as best we can:
          url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, u);
          if (!window.open(url)) { // popup blocked, offer direct download:
            if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
              location.href = url;
            }
          }
          return true;
        }

        var f = D.createElement("iframe");
        D.body.appendChild(f);

        if (!winMode) {
          url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, u);
        }

        f.src = url;
        setTimeout(function () {
          D.body.removeChild(f);
        }, 333);

      }

      if (navigator.msSaveBlob) {
        return navigator.msSaveBlob(blob, fn);
      }

      if (window.URL) {
        saver(window.URL.createObjectURL(blob), true);
      } else {
        if (typeof blob === "string" || blob.constructor === stringify) {
          try {
            return saver("data:" + mimeType + ";base64," + window.btoa(blob));
          } catch (y) {
            return saver("data:" + mimeType + "," + encodeURIComponent(blob));
          }
        }

        fr = new FileReader();
        fr.onload = function (e) {
          saver(this.result);
        };

        fr.readAsDataURL(blob);
      }

      return true;

    };

  });
