import { ModeloState } from "@/store/useModeloStore";

export function getModeloPatch(
  oldData: Omit<ModeloState, "id">,
  newData: Partial<Omit<ModeloState, "id">>
): Partial<Omit<ModeloState, "id">> {

    console.log("oldData:",oldData)
    console.log("newData", newData)

  const patch: Partial<Omit<ModeloState, "id">> = {};

  (Object.keys(newData) as Array<keyof Omit<ModeloState, "id">>).forEach((key) => {
    const newValue = newData[key];
    const oldValue = oldData[key];

    if (key === "imagem") {
      // Sempre inclui imagem
        patch[key] = newValue as File;  
        return;
    }

    if (newData[key] !== oldData[key]) {
      // Aqui atribuímos explicitamente para cada campo, usando switch
      switch (key) {
        case "nome":
          patch.nome = newData.nome;
          break;
        case "descricao":
          patch.descricao = newData.descricao;
          break;
        case "precoTotal":
          patch.precoTotal = newData.precoTotal;
          break;
        case "precoSinal":
          patch.precoSinal = newData.precoSinal;
          break;
        case "duracaoHoras":
          patch.duracaoHoras = newData.duracaoHoras;
          break;
      }
    }
  });
  console.log('objeto patch:' , patch)
  return patch;
}
