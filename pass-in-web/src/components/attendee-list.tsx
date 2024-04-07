import { ChangeEvent, useState } from 'react'

import { formatDate, formatDateDayjs } from '../hooks/format-date'
import { attendees } from '../mock-data/attendees'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableCell } from './table/table-cell'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronRight,
  ChevronLeft,
  ChevronsRight
} from 'lucide-react'

// attendee --> Participante de um evento
export function AttendeeList() {
  const [search, setSearch] = useState('')
  // Estado para controlar a página atual da paginação.
  const [page, setPage] = useState(1)

  /*
    Para calcular o total pegamos o tamanho do array e dividimos por 10, pois queremos mostrar 10 itens por pagina, logo se tivermos 200 itens, teremos 20 paginas, pois 200/10 = 20

    como podemos ter um numero quebrado tipo 212/10 = 21.2, que seria 2 itens em uma pagina só, para arredondar para cima usamos o Math.ceil(attendees.length/10), que arredonda para cima, logo 21.2 = 22, ou seja, estamos na pagina 22 com 2 itens
  */
  const TOTAL_PAGE = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function goToNextPage() {
    // Se a pagina atual * 10 for maior ou igual ao tamanho do array, logo não tem mais itens para mostrar, então não faz nada
    if (page * 10 >= attendees.length) {
      return
    }
    // page + 1 --> Vai para a próxima pagina
    setPage(page + 1)
  }

  function goToPreviousPage() {
    // Se a pagina atual for menor ou igual a 1, logo não tem como voltar para uma pagina anterior, então não faz nada
    if (page <= 1) {
      return
    }
    // page - 1 --> Vai para a pagina anterior
    setPage(page - 1)
  }

  function goToLastPage() {
    // Vai para a ultima pagina, ou seja, o tamanho do array dividido por 10, que é a quantidade de itens por pagina
    setPage(TOTAL_PAGE)
  }

  function goToFirstPage() {
    // Vai para a primeira pagina, ou seja, a pagina 1
    setPage(1)
  }

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
          <input
            onChange={onSearchInputChanged}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar participantes..."
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              {/*
                  Para personalizar os checkbox usando o tailwind usamos o plugin npm i -D @tailwindcss/forms porque para manipular o css dos itens dos forms  é complicado
                */}
              <input
                className="size-4 bg-black/20 rounded border border-white/10"
                type="checkbox"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }} />
          </tr>
        </thead>
        <tbody>
          {
            // _, --> valor do array, ai no caso como é um array vazio, logo não vamos ter valor algum
            // i --> o index(Ñ é recomendado usar o index do .map como key para os componentes)
            // Array.from({ length: 8 }).map((_, i) => {

            /*

              usamos o slice para pegar uma parte do Array, para fazer o sistema de paginação, indo de 10 em 10 itens por pagina. Ou seja, se tivermos 200 itens/tamanho do array, logo teremos 20 paginas, pois 200/10 = 20
            */
            // attendees.slice(0, 10).map((attendee) => {

            /*
              Começamos com o page 1 - 1 * 10 ate o page 1 * 10, ou seja, 0 ate 10, depois 10 ate 20, 20 ate 30...

              Então se estou na primeira pagina que é 1, ele vai fazer 1 - 1 = 0 * 10 = 0 ate 1 * 10 = 10, ou seja, 0 ate 10, que é a primeira pagina

              se page for 2, ele vai fazer 2 - 1 = 1 * 10 = 10 ate 2 * 10 = 20, ou seja, 10 ate 20, que é a segunda pagina...
            */
            attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
              return (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <input
                      className="size-4 bg-black/20 rounded border border-white/10 "
                      type="checkbox"
                    />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span className="text-white">
                        {formatDate(attendee.createdAt)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {formatDateDayjs(attendee.createdAt)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDateDayjs(attendee.checkedInAt)}</TableCell>
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
          <tr>
            {/*
              colSpan --> Quantas colunas ele vai ocupar
            */}
            <TableCell colSpan={3}>
              Mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              {/*
                  inline-flex --> display: inline-flex; --> Ele deixa como flex normal, so que ele fica com display inline,em vez de display block, logo o alinhamento de texto funciona nesse elemento que é uma div, ex: text-right
                */}
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {TOTAL_PAGE}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page >= TOTAL_PAGE}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page >= TOTAL_PAGE}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
