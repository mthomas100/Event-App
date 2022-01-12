export const getRandomColor = (opacity : number) => {
	const colorNum = () => Math.floor(Math.random() * 255);
	const color = `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, ${opacity})`
	return color; 
}