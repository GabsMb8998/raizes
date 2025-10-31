export const formatarReais = (value: number) =>{
    return `R$${value}`
}

export const formatarHora = (value: number) => {
    return `${value}h`
}

export const slugify = (str: string) =>
  str
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // tira acento
    .toLowerCase()
    .replace(/\s+/g, "-") // espaços viram -
    .replace(/[^\w-]+/g, "") // remove chars especiais

export const formatarDia = (date: string[]) => {
  return date.map(item => item.split("-")[2]);
} 

export const formatarDate = (date: string) => {

    const data = new Date(date)
    const dia = String(data.getDate()).padStart(2, '0'); // 1 -> 01
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
    const ano = data.getFullYear();

    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
}

export const formatarDataAnoMesDia = (date: string): string => {
    const data = new Date(date)

    const dia = String(data.getDate()).padStart(2, '0');        // 1 -> 01
    const mes = String(data.getMonth() + 1).padStart(2, '0');   // Janeiro = 0
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

export const formatarHoraDate = (date: string): string => {
    const data = new Date(date)
    const horas = String(data.getHours()).padStart(2, '0');   // 9 -> 09
    const minutos = String(data.getMinutes()).padStart(2, '0'); // 5 -> 05

    return `${horas}:${minutos}`;
}