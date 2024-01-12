function loadZipAsBlob(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';

  xhr.onload = () => {
    if (xhr.status === 200) {
      callback(null, xhr.response);
    } else {
      callback(new Error(`Failed to load ${url}: ${xhr.status} ${xhr.statusText}`));
    }
  };

  xhr.onerror = () => {
    callback(new Error(`Network error while loading ${url}`));
  };

  xhr.send();
}

function unzipBlob(zipBlob, callback) {
  const reader = new FileReader();
  reader.onload = () => {
    const zipData = reader.result;
    const zip = new JSZip();
    zip.loadAsync(zipData)
      .then(zip => {
        const extractedFiles = [];
        zip.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir) {
            zipEntry.async('blob')
              .then(blob => {
                extractedFiles.push({
                  name: zipEntry.name,
                  blob: blob
                });
                if (extractedFiles.length === zip.files.length) {
                  callback(null, extractedFiles);
                }
              })
              .catch(error => {
                callback(new Error('Failed to extract files from zip: ' + error.message));
              });
          }
        });
      })
      .catch(error => {
        callback(new Error('Failed to load zip: ' + error.message));
      });
  };
  reader.onerror = () => {
    callback(new Error('Error reading zip file.'));
  };
  reader.readAsArrayBuffer(zipBlob);
}

aynsc function urlzip(zipUrl){
loadZipAsBlob(zipUrl, (loadError, zipBlob) => {
  if (loadError) {
    console.error('Error loading zip file:', loadError);
    return;
  }
  console.log('Zip file loaded as a Blob:', zipBlob);

  unzipBlob(zipBlob, (unzipError, files) => {
    if (unzipError) {
      console.error('Error extracting zip file:', unzipError);
      return;
    }
    console.log('Extracted files:', files);
    var arr = []
    // Store the extracted files as Blobs
    files.forEach(file => {
      const newBlob = new Blob([file.blob], { type: 'application/octet-stream' });
      arr = arr.concat([
        newBlob
      ]);
      console.log('Stored file:', file.name);
    });
    console.log('All files stored successfully.');
    return arr
  });
});
}
