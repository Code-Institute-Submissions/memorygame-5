export function validateElement(elementName)
{

  if(elementName)
  {

  }
  else
  {
    log("ERROR: Element " + elementName + " is not defined");
  }

}

export function assignClickListner(element,func)
{
	if ((element) && (typeof func === "function") ) 
		element.addEventListener('click', func);
	else
	{
		if(element)
			console.log("Could not add listner, function does not exist");
		else
			console.log("Could not add listener for element " + element + " it does not exist");
	}
}