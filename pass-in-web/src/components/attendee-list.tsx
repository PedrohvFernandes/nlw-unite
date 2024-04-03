import { Search, MoreHorizontal, ChevronsLeft, ChevronRight, ChevronLeft, ChevronsRight } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table/table-row"

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

      <Table>

        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              {/* 
                  Para personalizar os checkbox usando o tailwind usamos o plugin npm i -D @tailwindcss/forms porque para manipular o css dos itens dos forms  é complicado
                */}
              <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {
            // _, --> valor do array, ai no caso como é um array vazio, logo não vamos ter valor algum
            // i --> o index(Ñ é recomendado usar o index do .map como key para os componentes)
            Array.from({ length: 8 }).map((_, i) => {
              return (
                <TableRow key={i} >
                  <TableCell>
                    <input className="size-4 bg-black/20 rounded border border-white/10 " type="checkbox" />
                  </TableCell>
                  <TableCell>12345</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">Pedro Henrique</span>
                      <span>pedrohv20fernandes@gmail.com</span>
                    </div>
                  </TableCell>
                  <TableCell>7 dias atrás</TableCell>
                  <TableCell>3 dias atrás </TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </tbody>
        <tfoot>
          <TableRow>
            {/* 
              colSpan --> Quantas colunas ele vai ocupar
            */}
            <TableCell colSpan={3}>
              Mostrando 10 de 228 itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              {/* 
                  inline-flex --> display: inline-flex; --> Ele deixa como flex normal, so que ele fica com display inline,em vez de display block, logo o alinhamento de texto funciona nesse elemento que é uma div, ex: text-right
                */}
              <div className="inline-flex items-center gap-8">
                <span>Página 1 de 23</span>
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>

    </div>
  )
}