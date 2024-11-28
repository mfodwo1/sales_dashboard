import React from 'react'



const ErrorMessage = ({ message }: { message: string }) => {
    
  return <p className="text-red-500 mb-4">{message}</p>;
  
}

export default ErrorMessage