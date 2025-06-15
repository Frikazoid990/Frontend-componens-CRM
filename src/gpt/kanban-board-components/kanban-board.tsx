"use client"

import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd"; // Using @hello-pangea/dnd as a modern fork
import { useState } from "react"

interface Deal {
  id: string
  customer: string
  car: string
  date: string
  price: string
  company: string
}

interface KanbanColumn {
  id: string
  title: string
  deals: Deal[]
}

interface KanbanBoardProps {
  initialColumns: KanbanColumn[]
}

export function KanbanBoard({ initialColumns }: KanbanBoardProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // If the item is dropped in the same column and same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const newColumns = Array.from(columns)
    const sourceColIndex = newColumns.findIndex((col) => col.id === source.droppableId)
    const destinationColIndex = newColumns.findIndex((col) => col.id === destination.droppableId)

    const sourceColumn = newColumns[sourceColIndex]
    const destinationColumn = newColumns[destinationColIndex]

    // Remove the dragged item from the source column
    const [draggedItem] = sourceColumn.deals.splice(source.index, 1)

    // Add the dragged item to the destination column at the specified index
    destinationColumn.deals.splice(destination.index, 0, draggedItem)

    setColumns(newColumns)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map((column, colIndex) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <h3 className="font-medium text-sm">{column.title}</h3>
                  {colIndex < columns.length - 1 && <span className="text-gray-400 text-sm">→</span>}
                </div>
                <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[100px]">
                  {" "}
                  {/* Added min-h for better droppable area */}
                  {column.deals.length > 0 ? (
                    column.deals.map((deal, dealIndex) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={dealIndex}>
                        {(providedDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            className="border border-gray-300 rounded-md p-3 text-sm bg-white shadow-sm cursor-grab active:cursor-grabbing"
                          >
                            <p className="font-semibold">{deal.customer}</p>
                            <p className="text-gray-700">{deal.car}</p>
                            <p className="text-gray-500 text-xs">Дата начала сделки: {deal.date}</p>
                            <p className="font-bold mt-1">{deal.price}</p>
                            <p className="text-blue-600 text-xs mt-2">{deal.company}</p>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 text-sm py-8">Нет сделок в данном статусе.</div>
                  )}
                  {provided.placeholder} {/* Important for dnd to work correctly */}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}
