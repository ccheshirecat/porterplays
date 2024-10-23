"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Player = {
  id: number
  rank: number
  name: string
  score: number
}

const initialPlayers: Player[] = [
  { id: 1, rank: 1, name: "Alice", score: 1000 },
  { id: 2, rank: 2, name: "Bob", score: 900 },
  { id: 3, rank: 3, name: "Charlie", score: 800 },
  { id: 4, rank: 4, name: "David", score: 700 },
  { id: 5, rank: 5, name: "Eve", score: 600 },
  { id: 6, rank: 6, name: "Frank", score: 500 },
  { id: 7, rank: 7, name: "Grace", score: 400 },
  { id: 8, rank: 8, name: "Henry", score: 300 },
  { id: 9, rank: 9, name: "Ivy", score: 200 },
  { id: 10, rank: 10, name: "Jack", score: 100 },
]

export default function Page() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [search, setSearch] = useState("")

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <div className="mb-4">
        <Input
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm mx-auto"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Prize</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Wagered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell>
                  <Badge variant={player.rank <= 3 ? "default" : "secondary"}>
                    {player.rank}
                  </Badge>
                </TableCell>
                <TableCell>SS</TableCell>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell className="text-right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}