import { ModeloState, ModeloStateGet } from "@/store/useModeloStore";

export function getModeloPatch(
  oldData: Omit<ModeloState, "id" | "imagem">,
  newData: Partial<Omit<ModeloState, "id" | "imagem">>
): Partial<Omit<ModeloState, "id">> {

    console.log("oldData:",oldData)
    console.log("newData", newData)

  const patch: Partial<Omit<ModeloState, "id" | "imagem">> = {};

  (Object.keys(newData) as Array<keyof Omit<ModeloState, "id" | "imagem">>).forEach((key) => {
    const newValue = newData[key];
    const oldValue = oldData[key];

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
