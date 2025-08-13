import React from 'react';

const VideoSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See how Healix has transformed lives through personalized <span className="text-blue-500">health tracking and support</span>
          </h2>
        </div>
        <div className="relative">
          {/* This is a simplified representation. A real implementation would use a video player component. */}
          <div className="bg-black rounded-lg h-96 flex items-center justify-center">
            <p className="text-white">Video Player Placeholder</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Have a success story with Healix? We’d love to <span className="text-gray-500">hear from you!</span>
          </h3>
          <a href="/contact" className="inline-block bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg border border-gray-300">
            Share your video
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
