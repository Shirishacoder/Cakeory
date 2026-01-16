import React, { useState, useRef, useEffect } from 'react';
import CreateImg from './CreateImg';

const QuickDrawModal = ({ showModal, onClose, onImageSelect }) => {
  const [selectedImageForPreview, setSelectedImageForPreview] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generating, setGenerating] = useState(false);
  const createImgRef = useRef(null);

  // Listen for generated images from CreateImg component
  const handleImageGeneration = (images, isAppend = false) => {
    if (isAppend) {
      // Append new images to existing ones
      setGeneratedImages(prev => [...prev, ...images]);
    } else {
      // Replace existing images (first batch or new query)
      setGeneratedImages(images);
    }
    setGenerating(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && createImgRef.current && !generating) {
      setGenerating(true);
      // Trigger image generation in CreateImg component
      createImgRef.current.generateImages(1);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageForPreview(imageUrl);
  };

  const handleSelectImage = (imageUrl, prompt) => {
    // Safe fallback if prompt is missing
    const safePrompt = prompt || "Custom AI Design";
    // Create a mock model object similar to existing models
    const generatedModel = {
      id: `generated_${Date.now()}`, 
      name: `AI Generated: ${safePrompt.length > 30 ? safePrompt.substring(0, 30) + '...' : safePrompt}`,
      image: imageUrl,
      category: 'AI Generated'
    };
    
    onImageSelect(generatedModel);
    handleClose();
  };

  const handleClose = () => {
    setGeneratedImages([]);
    setSelectedImageForPreview(null);
    setGenerating(false);
    if (createImgRef.current) {
      createImgRef.current.reset(); // Reset CreateImg component
    }
    onClose();
  };

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-5xl w-full max-h-[85vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">QuickDraw - AI Cake Generator</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* CreateImg Component Integration */}
            <div className="mb-6">
              <CreateImg 
                ref={createImgRef}
                onImagesGenerated={handleImageGeneration}
                isModal={true}
                onGenerateStart={(isNewQuery = false) => {
                  if (isNewQuery) {
                    // Reset everything for new query
                    setGeneratedImages([]);
                  }
                  setGenerating(true);
                }}
              />
            </div>

            {/* Generated Images Display */}
            {generatedImages.length > 0 && (
              <>
                <div className="flex justify-center mb-6">
                  {generatedImages.map((imageData, idx) => (
                    <div
                      key={`${imageData.batch}-${idx}`}
                      className="border-2 border-[rgba(224,99,99,0.2)] rounded-xl overflow-hidden shadow-lg max-w-md w-full"
                    >
                      <div className="relative">
                        <img
                          src={imageData.url}
                          draggable="false"
                          alt={`Generated Cake ${idx + 1}`}
                          className="w-full h-80 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handleImageClick(imageData.url)}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&auto=format';
                          }}
                        />
                      </div>
                      <div className="p-3 text-center">
                        <button
                          onClick={() => handleSelectImage(imageData.url, imageData.prompt)}
                          className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-3 text-lg font-medium hover:bg-red-600 rounded-lg transition-colors w-full shadow-md"
                        >
                          Select This Design
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Loading State */}
            {generating && (
              <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgba(224,99,99,0.85)]"></div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Baking your design...
                  </h3>
                  <p className="text-sm text-gray-500">
                    Our AI is generating a unique cake design for you.
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {generatedImages.length === 0 && !generating && (
              <div className="text-center py-8 text-gray-500">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">Ready to Create Amazing Cakes!</p>
                <p className="text-sm">Describe your dream cake and our AI will generate a realistic design.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImageForPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setSelectedImageForPreview(null)}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
            >
              ×
            </button>
            <img
              draggable="false"
              src={selectedImageForPreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => {
                  // Find the current prompt from the selected image
                  const selectedImage = generatedImages.find(img => img.url === selectedImageForPreview);
                  const promptToUse = selectedImage?.prompt || createImgRef.current?.getCurrentPrompt?.() || 'Custom Design';
                  handleSelectImage(selectedImageForPreview, promptToUse);
                }}
                className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-3 text-sm font-medium hover:bg-red-600 rounded-lg transition-colors shadow-lg"
              >
                Select This Design
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickDrawModal;