let fetchView = async (page, id) => {
	try {
		let res = await fetch(page);
		if (!res.ok) {
		 let err = `An error has occurred: ${res.status}`;
		 throw new Error(err);
		}
		
		const html = await res.text();
		let parser = new DOMParser();
		let doc = parser.parseFromString(html, 'text/html');
		let temp = doc.querySelector('template');
		document.getElementById(id).content.append(temp.content)
		
	} catch(error) {
		console.log(error);
	}
}




export default fetchView;