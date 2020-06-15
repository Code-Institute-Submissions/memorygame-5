/*
Contains functions for logging and debug

*/

let debug=true;



export  function validateElement(elementName)
{

  if(elementName)
  {

  }
  else
  {
    log("ERROR: Element " + elementName + " is not defined");
  }

}

//image in an index into the collection of images
export  function logImageDetails(imageIndex)
{
	
	log("src = " + imagesCollection[imageIndex].src + " Allocation = " + imagesAllocation[imageIndex]);

} 

//creates a collection of images with front faces
export  function logImagesCollection()
{
	for (var i = 0; i < imagesCollection.length; i++) {
		
		log(imagesCollection[i]);
		
	}
}

// testing function
export function log(textToLog)
{
	if(debug)
		console.log(textToLog);
}