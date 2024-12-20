import React, { useState } from "react";

const ModelBox = ({ showModal, setShowModal, stopTimer }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOption('');
    setSelectedSubOption('');
    setCustomReason('');
  };

  const handleEndClass = () => {
    stopTimer();
    handleCloseModal();
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedSubOption('');
    setCustomReason('');
  };

  const handleSubOptionChange = (subOption) => {
    setSelectedSubOption(subOption);
    if (subOption !== 'other') {
      setCustomReason('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg relative max-w-md w-full">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-500"
        >
          &times;
        </button>
        <h1 className="mb-4 font-bold text-xl">Select a reason to end class</h1>
        
        
        <div className="mb-4">
          <label className="mb-2 flex items-center">
            <input
              type="radio"
              value="completed"
              checked={selectedOption === 'completed'}
              onChange={() => handleOptionChange('completed')}
              className="hidden"
            />
            <div
              className={`w-6 h-6 mr-2 rounded-full border-2 ${
                selectedOption === 'completed' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
              } relative flex justify-center items-center`}
            >
              {selectedOption === 'completed' && (
                <span className="text-white">✔</span>
              )}
            </div>
            Class completed
          </label>
          
          <label className=" mb-2 flex items-center">
            <input
              type="radio"
              value="interrupted"
              checked={selectedOption === 'interrupted'}
              onChange={() => handleOptionChange('interrupted')}
              className="hidden"
            />
            <div
              className={`w-6 h-6 mr-2 rounded-full border-2 ${
                selectedOption === 'interrupted' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
              } relative flex justify-center items-center`}
            >
              {selectedOption === 'interrupted' && (
                <span className="text-white">✔</span>
              )}
            </div>
            Class interrupted/aborted 
          </label>

          {selectedOption === 'interrupted' && (
            <div className="ml-6 mb-4 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student_no_show"
                  checked={selectedSubOption === 'student_no_show'}
                  onChange={() => handleSubOptionChange('student_no_show')}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 mr-2 rounded-full border-2 ${
                    selectedSubOption === 'student_no_show' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                  } relative flex justify-center items-center`}
                >
                  {selectedSubOption === 'student_no_show' && (
                    <span className="text-white">✔</span>
                  )}
                </div>
                Student didn’t show up for class
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="no_interest"
                  checked={selectedSubOption === 'no_interest'}
                  onChange={() => handleSubOptionChange('no_interest')}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 mr-2 rounded-full border-2 ${
                    selectedSubOption === 'no_interest' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                  } relative flex justify-center items-center`}
                >
                  {selectedSubOption === 'no_interest' && (
                    <span className="text-white">✔</span>
                  )}
                </div>
                Student didn’t show any interest
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="student_disconnected"
                  checked={selectedSubOption === 'student_disconnected'}
                  onChange={() => handleSubOptionChange('student_disconnected')}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 mr-2 rounded-full border-2 ${
                    selectedSubOption === 'student_disconnected' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                  } relative flex justify-center items-center`}
                >
                  {selectedSubOption === 'student_disconnected' && (
                    <span className="text-white">✔</span>
                  )}
                </div>
                Student got disconnected
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="teacher_disconnected"
                  checked={selectedSubOption === 'teacher_disconnected'}
                  onChange={() => handleSubOptionChange('teacher_disconnected')}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 mr-2 rounded-full border-2 ${
                    selectedSubOption === 'teacher_disconnected' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                  } relative flex justify-center items-center`}
                >
                  {selectedSubOption === 'teacher_disconnected' && (
                    <span className="text-white">✔</span>
                  )}
                </div>
                I got disconnected
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="other"
                  checked={selectedSubOption === 'other'}
                  onChange={() => handleSubOptionChange('other')}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 mr-2 rounded-full border-2 ${
                    selectedSubOption === 'other' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                  } relative flex justify-center items-center`}
                >
                  {selectedSubOption === 'other' && (
                    <span className="text-white">✔</span>
                  )}
                </div>
                Other reason
              </label>
              {selectedSubOption === 'other' && (
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Please provide a custom reason"
                  className="w-full p-2 border-2 rounded"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleEndClass}
            disabled={
              selectedOption === 'interrupted' &&
              (!selectedSubOption || (selectedSubOption === 'other' && !customReason))
            }
            className={`px-4 py-2 rounded ${
              selectedOption &&
              (selectedOption === 'completed' ||
                (selectedOption === 'interrupted' && selectedSubOption && (selectedSubOption !== 'other' || customReason)))
                ? 'bg-orange-500 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            End Class
          </button>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelBox;
