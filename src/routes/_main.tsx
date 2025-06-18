	import MainLayout from '@/components/items/MainLayout'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_main')({
	component: MainLayout
})

