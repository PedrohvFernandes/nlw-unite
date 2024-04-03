import { Search, MoreHorizontal, ChevronsLeft, ChevronRight, ChevronLeft, ChevronsRight } from "lucide-react"

// attendee --> Participante de um evento
export function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-2">
          {/* 
        
          Quando a largura e altura de algum elemento é igual eu não preciso passar w-4 e h-4, basta passar o size-4. Lembrando que para mudar o tamanho desses icones a altura e altura tem que ser iguais

        */}
          <Search className="size-4 text-emerald-300" />
          {/*
          flex-1 --> faz com que o elemento ocupe todo o restante dentro de um elemento flex, se outro elemento tiver flex-1 os dois irão ocupar espaços iguais
        */}
          <input className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Buscar participantes..." />
        </div>
      </div>

      <div className="border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th style={{
                width: 48
              }} className="py-3 px-4 text-sm font-semibold text-left">
                {/* 
                  Para personalizar os checkbox usando o tailwind usamos o plugin npm i -D @tailwindcss/forms porque para manipular o css dos itens dos forms  é complicado
                */}
                <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox" />
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Código</th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Participantes</th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Data de inscrição</th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Data do check-in</th>
              <th style={{
                width: 64
              }} className="py-3 px-4 text-sm font-semibold text-left"></th>
            </tr>
          </thead>
          <tbody>
            {
              // _, --> valor do array, ai no caso como é um array vazio, logo não vamos ter valor algum
              // i --> o index(Ñ é recomendado usar o index do .map como key para os componentes)
              Array.from({ length: 8 }).map((_, i) => {
                return (
                  <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-sm text-zinc-300">
                      <input className="size-4 bg-black/20 rounded border border-white/10 " type="checkbox" />
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-300">12345</td>
                    <td className="py-3 px-4 text-sm text-zinc-300">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-white">Pedro Henrique</span>
                        <span>pedrohv20fernandes@gmail.com</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-300">
                      7 dias atrás
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-300">
                      3 dias atrás
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-300">
                      <button className="bg-black/20 border border-white/10 rounded-md px-1.5 p-1.5">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              {/* 
              colSpan --> Quantas colunas ele vai ocupar
            */}
              <td className="py-3 px-4 text-sm font-semibold text-left" colSpan={3}>
                Mostrando 10 de 228 itens
              </td>
              <td className="py-3 px-4 text-sm font-semibold text-right" colSpan={3}>
                {/* 
                  inline-flex --> display: inline-flex; --> Ele deixa como flex normal, so que ele fica com display inline,em vez de display block, logo o alinhamento de texto funciona nesse elemento que é uma div, ex: text-right
                */}
                <div className="inline-flex items-center gap-8">
                  <span>Página 1 de 23</span>
                  <div className="flex gap-1.5">
                    <button className="bg-white/20 border border-white/10 rounded-md px-1.5 p-1.5">
                      <ChevronsLeft className="size-4" />
                    </button>
                    <button className="bg-white/20 border border-white/10 rounded-md px-1.5 p-1.5">
                      <ChevronLeft className="size-4" />
                    </button>
                    <button className="bg-white/20 border border-white/10 rounded-md px-1.5 p-1.5">
                      <ChevronRight className="size-4" />
                    </button>
                    <button className="bg-white/20 border border-white/10 rounded-md px-1.5 p-1.5">
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}