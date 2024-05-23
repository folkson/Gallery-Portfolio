const galleryElement = document.getElementById('gallery');
const columns = 3;
const columnElements = [];

// 创建列元素
for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.classList.add('column');
    columnElements.push(column);
    galleryElement.appendChild(column);
}

// 从服务器获取图片 URL 并逐一展示
fetch('/images')
    .then(response => response.json())
    .then(imageUrls => {
        let index = 0;

        function loadNextImage() {
            if (index < imageUrls.length) {
                const img = document.createElement('img');
                img.src = imageUrls[index];
                img.alt = `Photo ${index + 1}`;
                img.onload = () => {
                    columnElements[index % columns].appendChild(img);
                    index++;
                    loadNextImage();
                };
                img.onerror = () => {
                    console.error(`Error loading image: ${imageUrls[index]}`);
                    index++;
                    loadNextImage();
                };
            }
        }

        loadNextImage();
    })
    .catch(error => console.error('Error loading images:', error));
