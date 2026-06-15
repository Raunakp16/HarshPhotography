import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import './UploadPanel.css';

const CATEGORY_OPTIONS = [
  { value: 'portraits', label: 'Portraits' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'pre-wedding', label: 'Pre Wedding' },
  { value: 'events', label: 'Events' },
  { value: 'nature', label: 'Nature' },
];

const UploadPanel = () => {
  const fileInputRef = useRef(null);
  const selectedPhotosRef = useRef([]);

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []).filter((file) =>
      file.type.startsWith('image/')
    );

    if (!files.length) return;

    setSelectedPhotos((currentPhotos) => {
      const existingKeys = new Set(
        currentPhotos.map(
          ({ file }) => `${file.name}-${file.size}-${file.lastModified}`
        )
      );

      const newPhotos = files
        .filter((file) => {
          const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
          return !existingKeys.has(fileKey);
        })
        .map((file) => ({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          previewUrl: URL.createObjectURL(file),
        }));

      return [...currentPhotos, ...newPhotos];
    });

    event.target.value = '';
  };

  const totalSizeLabel = useMemo(() => {
    const totalBytes = selectedPhotos.reduce(
      (total, photo) => total + photo.file.size,
      0
    );

    if (totalBytes === 0) {
      return '0 KB';
    }

    if (totalBytes < 1024 * 1024) {
      return `${(totalBytes / 1024).toFixed(1)} KB`;
    }

    return `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
  }, [selectedPhotos]);

  const selectedCategoryLabel = useMemo(() => {
    return (
      CATEGORY_OPTIONS.find((option) => option.value === category)?.label ||
      'Not selected'
    );
  }, [category]);

  const removePhoto = (photoId) => {
    setSelectedPhotos((currentPhotos) => {
      const photoToRemove = currentPhotos.find(
        (photo) => photo.id === photoId
      );

      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.previewUrl);
      }

      return currentPhotos.filter((photo) => photo.id !== photoId);
    });
  };

  const clearAllPhotos = () => {
    selectedPhotos.forEach((photo) =>
      URL.revokeObjectURL(photo.previewUrl)
    );

    setSelectedPhotos([]);
  };

  const handleUpload = async () => {
    if (!selectedPhotos.length) {
      alert('Please select photos.');
      return;
    }

    if (!category) {
      alert('Please select a category.');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append('category', category);

      selectedPhotos.forEach((photo) => {
        formData.append('images', photo.file);
      });

      const response = await axios.post(
        'http://localhost:5000/api/gallery/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);

      alert('Photos uploaded successfully!');

      clearAllPhotos();
      setCategory('');
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          'Upload failed. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    selectedPhotosRef.current = selectedPhotos;
  }, [selectedPhotos]);

  useEffect(() => {
    return () => {
      selectedPhotosRef.current.forEach((photo) =>
        URL.revokeObjectURL(photo.previewUrl)
      );
    };
  }, []);

  return (
    <div className='uploads'>
      <div className='uploads__header'>
        <div className='uploads__copy'>
          <p className='uploads__eyebrow'>Portfolio Manager</p>

          <h1>Admin Panel</h1>

          <p className='uploads__description'>
            Select portfolio photos, review each one inside the panel,
            and upload only when everything looks right.
          </p>

          <div className='uploads__category-panel'>
            <label className='uploads__category-label'>
              Select Category
            </label>

            <div className='uploads__category-control'>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Choose Category</option>

                {CATEGORY_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <p className='uploads__category-hint'>
              This category will be saved with every selected photo.
            </p>
          </div>
        </div>

        <div className='uploads__actions'>
          <button
            type='button'
            className='uploads__button uploads__button--secondary'
            onClick={handleButtonClick}
          >
            {selectedPhotos.length
              ? 'Add More Photos'
              : 'Select Photos'}
          </button>

          <button
            type='button'
            className='uploads__button uploads__button--primary'
            disabled={
              !selectedPhotos.length ||
              !category ||
              uploading
            }
            onClick={handleUpload}
          >
            {uploading ? 'Uploading...' : 'Upload Selected'}
          </button>
        </div>
      </div>

      <input
        type='file'
        ref={fileInputRef}
        className='uploads__input'
        accept='image/*'
        multiple
        onChange={handleFileChange}
      />

      <div className='uploads__summary'>
        <div className='uploads__summary-card'>
          <span>Selected Photos</span>
          <strong>{selectedPhotos.length}</strong>
        </div>

        <div className='uploads__summary-card'>
          <span>Total Size</span>
          <strong>{totalSizeLabel}</strong>
        </div>

        <div className='uploads__summary-card uploads__summary-card--wide'>
          <span>Category</span>
          <strong>{selectedCategoryLabel}</strong>
        </div>

        <button
          type='button'
          className='uploads__clear'
          disabled={!selectedPhotos.length}
          onClick={clearAllPhotos}
        >
          Clear Selection
        </button>
      </div>

      {selectedPhotos.length ? (
        <div className='uploads__grid'>
          {selectedPhotos.map((photo, index) => (
            <article
              className='uploads__card'
              key={photo.id}
            >
              <img
                className='uploads__preview'
                src={photo.previewUrl}
                alt={photo.file.name}
              />

              <div className='uploads__meta'>
                <div>
                  <p className='uploads__name'>
                    {photo.file.name}
                  </p>

                  <p className='uploads__details'>
                    Photo {index + 1} •{' '}
                    {(photo.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type='button'
                  className='uploads__remove'
                  onClick={() => removePhoto(photo.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className='uploads__empty'>
          <p>No photos selected yet.</p>

          <span>
            Choose one or more images to preview them here before
            upload.
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadPanel;
