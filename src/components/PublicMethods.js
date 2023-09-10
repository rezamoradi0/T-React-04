export function SaveToLocal(key,value){
localStorage.setItem(key,value);
}
export function GetToLocal(key){
return localStorage.getItem(key);
}
export function RemvoeItemLocal(key){
  return localStorage.removeItem(key);
}