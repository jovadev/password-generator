const MAX_LENGTH=32;
const MIN_LENGTH=6;
window.onload=main;

function main(){
    let btnGetPass=document.getElementById('btn_getpass');
    let btnCopyPass=document.getElementById('btn_copypass');
    let btnMode=document.getElementById('btn_change_mode')
    let passLengthInput=document.getElementById('pass-length');
    let lblNewPassword=document.getElementById('new_password');
    btnCopyPass.disabled=true;
    btnGetPass.addEventListener('click',()=>{
        let passLength=passLengthInput.value;
        let options=document.getElementsByName('options');
        let optionsChecked=[];
        options.forEach(el=>{
           if(el.checked)
                optionsChecked.push(el.value);
        });
        if(!optionsChecked.length){
            messageError("Error, Select at least one option.");
            return ;
        }
        if(passLength > MAX_LENGTH || passLength < MIN_LENGTH){
            messageError(`Error, min-length is ${MIN_LENGTH} characters & max-length is ${MAX_LENGTH} characters.`);
            return ;
        }
        let newPassword=getPassword(passLength,optionsChecked,optionsChecked.length);
        lblNewPassword.innerText=newPassword;
        btnCopyPass.disabled=false;
    });
    
    let copySuccess=document.getElementById('copy_success');
    btnCopyPass.addEventListener('click',function(){
        navigator.clipboard.writeText(lblNewPassword.textContent).then(()=>{
            copySuccess.style.display="inline";
            setTimeout(()=>{
                copySuccess.style.display="none";
            },1500);
        });
    });

    btnMode.addEventListener('click',function(){
        document.body.classList.toggle('whiteMode');
        this.classList.toggle('dark');
        this.parentElement.classList.toggle('white');
    });
}

function getPassword(passLength,optionsChecked,nOptions){
    let pass=[];
    const typesPass={
        "numbers":()=>Math.floor(Math.random()*10),
        "symbols":()=>getSymbol(),
        "lowercase":()=>String.fromCharCode(Math.floor(Math.random()*26)+97),
        "uppercase":()=>String.fromCharCode(Math.floor(Math.random()*26)+65)
    }
    for(let i=0,j=0;i<passLength;i++){
        let character=typesPass[optionsChecked[j]]();
        j++;
        pass.push(character);
        j=j==nOptions?0:j;
    }
    console.log("pass:",pass);
    pass.sort(()=>Math.random()-.5);
    return pass.join("");
}
function messageError(message){
    let containerError=document.getElementById('container_error');
    containerError.innerHTML=`<p>${message}</p>`;
    containerError.classList.add("show_error");
    setTimeout(()=>{
        containerError.classList.remove("show_error");
    },1500);
}
function getSymbol(){
    let symbols="#$%&*[{]}/!+";
    let symbolsLength=symbols.length;
    let index=Math.floor(Math.random()*symbolsLength);
    return symbols[index];
}

