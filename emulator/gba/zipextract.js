function loadZipAsBlob(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Failed to load ${url}: ${xhr.status} ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error(`Network error while loading ${url}`));
    };

    xhr.send();
  });
}

function unzipBlob(zipBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const zipData = reader.result;
      const zip = new JSZip();
      zip.loadAsync(zipData)
        .then(zip => {
          const extractedFiles = [];
          zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
              extractedFiles.push(
                zipEntry.async('blob')
                  .then(blob => {
                    return {
                      name: zipEntry.name,
                      blob: blob
                    };
                  })
              );
            }
          });

          Promise.all(extractedFiles)
            .then(files => {
              resolve(files);
            })
            .catch(error => {
              reject(new Error('Failed to extract files from zip: ' + error.message));
            });
        })
        .catch(error => {
          reject(new Error('Failed to load zip: ' + error.message));
        });
    };
    reader.onerror = () => {
      reject(new Error('Error reading zip file.'));
    };
    reader.readAsArrayBuffer(zipBlob);
  });
}
function urlzipblob(zipUrl){
  loadZipAsBlob(zipUrl)
    .then(zipBlob => {
      console.log('Zip file loaded as a Blob:', zipBlob);
      unzipBlob(zipBlob)
        .then(files => {
          console.log('Extracted files:', files);
          const storePromises = files.map(file => {
            const newBlob = new Blob([file.blob], { type: 'application/octet-stream' });
            console.log('Stored file:', file.name);
          });
          Promise.all(storePromises)
            .then((data) => {
              return data
              console.log('All files stored successfully.');
            })
            .catch(error => {
              console.error('Error storing files:', error);
            });
        })
        .catch(error => {
          console.error('Error extracting zip file:', error);
        });
    })
    .catch(error => {
      console.error('Error loading zip file:', error);
    });
}
