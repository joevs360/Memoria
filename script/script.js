ordem =  null;
pontos = 0;
posicao = 0;
desativar = false;
			
function limparSelecao(){
    for(i=0;i<6;i++){
		op = "c"+i;
		document.getElementById(op).style.backgroundColor = "white";
	}
}
function tocarSom(i){
	const som = new Audio("sounds/"+i);
	som.play();
}
async function mostrarSelecao(i,t){
	op = "c"+i;
	tocarSom(i+".wav");
	document.getElementById(op).style.backgroundColor = "#ffe45e";
	await syncDelay(t);
	document.getElementById(op).style.backgroundColor = "white";
}
async function selecionar(i){
	if(!desativar){
		desativar = true;
		op = "c"+i;
		await mostrarSelecao(i,200)
		if(ordem[posicao] == i){
			posicao++;
		   //se chegar no ultimo numero gerar um novo e mostrar a sequencia novamente
			if(posicao == ordem.length){
			    ordem.push(gerarNumero());
				posicao=0;
				pontos++;
				document.getElementById('pontos').innerHTML ="PONTOS: "+pontos;
				await mostrarOrdem(0);
			}
		}
	    else{
		    document.body.style.backgroundColor="#fc5353";
		    document.getElementById('dados').innerHTML ="Você errou!!!<br>Sua pontuação foi de "+pontos+" pontos";
		    document.getElementById('pontos').innerHTML ="PONTOS: 0";
		    document.getElementById("divJogo").style.display ="none";
		   document.getElementById("divMenu").style.display ="block";
	    }
	     desativar = false;
    }
}
function gerarNumero(){
	min = Math.ceil(0);
    max = Math.floor(6);
 	return Math.floor(Math.random() * (max - min)) + min;
}
async function iniciar(){
	limparSelecao();
	desativar = true;
	document.body.style.backgroundColor="#D6E8FF";
	document.getElementById("divJogo").style.display ="block";
	document.getElementById("divMenu").style.display ="none";
	await syncDelay(1000);
	ordem=[];
	posicao="0";
	pontos =0;
	ordem.push(gerarNumero());
	mostrarOrdem(0);
}
async function mostrarOrdem(i){
	if(i==0){
		await syncDelay(1000);
		document.body.style.backgroundColor="#5CC7B2";
		desativar = true;
	}
	//Aumentar a velocidade
	v = 500-(500*pontos*5/100)
	//Limite é 50ms
	if(v<50){v=50;}
	
	await mostrarSelecao(ordem[i],v);
		if(i<ordem.length-1){
			i++;
			await syncDelay(v*2);
			mostrarOrdem(i);
		}
	else{
		desativar = false;
		document.body.style.backgroundColor="#D6E8FF";
	}
}
			
function syncDelay(ms){
    return new Promise(function(resolve){setTimeout(resolve,ms); });
}