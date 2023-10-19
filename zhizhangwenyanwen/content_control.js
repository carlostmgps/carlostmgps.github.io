// JavaScript Document

function showContent(cid){
	var elArray = Array();
	elArray = document.getElementById('mainContent').getElementsByTagName('div');
	for(var i=0; i < elArray.length; i++){
		elArray[i].style.display = 'none';
	}
	document.getElementById(cid).style.display = 'block';
}