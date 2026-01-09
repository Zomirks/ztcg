'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cardIds = ['OP12-042', 'OP12-066', 'OP12-109', 'OP10-012','OP12-044'];

interface CardData {
    card_set_id: string;
    card_name: string;
    card_image: string;
    card_image_id: string;
    set_name: string;
    set_id: string;
    rarity: string;
    card_color: string;
    card_type: string;
    card_cost: string;
    card_power: string;
    life: number | null;
    counter_amount: number;
    attribute: string;
    sub_types: string;
    card_text: string;
    inventory_price: number;
    market_price: number;
    date_scraped: string;
}

const OnePieceTest = () => {
    const apiUrl = 'https://www.optcgapi.com/api/sets/';
    const [matchingCards, setMatchingCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);

                const uniqueSets = [...new Set(cardIds.map(cardId => cardId.split('-')[0]))];

                const allCardsPromises = uniqueSets.map(async (setId) => {
                    const apiSetId = setId.replace(/^OP(\d+)$/, 'OP-$1');
                    const response = await fetch(`${apiUrl}${apiSetId}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch set ${apiSetId}`);
                    }
                    const data = await response.json();
                    return data;
                });

                const allSetsCards = await Promise.all(allCardsPromises);
                const allCards = allSetsCards.flat();
                const filtered = allCards.filter(card =>
                    cardIds.includes(card.card_set_id)
                );

                setMatchingCards(filtered);
                setError(null);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                console.error('Error fetching cards:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) {
        return <div className="p-4 text-gray-100">Loading cards...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-400">Error: {error}</div>;
    }

    const getColorVariant = (color: string): "default" | "secondary" | "destructive" | "outline" => {
        const colorMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
            'Red': 'destructive',
            'Green': 'default',
            'Blue': 'default',
            'Purple': 'secondary',
            'Black': 'outline',
            'Yellow': 'secondary'
        };
        return colorMap[color] || 'default';
    };

    const getRarityVariant = (rarity: string): "default" | "secondary" | "destructive" | "outline" => {
        const rarityMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
            'L': 'default',
            'SR': 'secondary',
            'R': 'default',
            'UC': 'outline',
            'C': 'secondary'
        };
        return rarityMap[rarity] || 'secondary';
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-gray-100">One Piece TCG Collection</h2>
            <p className="text-gray-400 mb-6">Found {matchingCards.length} matching cards</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingCards.map((card) => (
                    <Card key={card.card_set_id} className="bg-gray-800 border-gray-700 overflow-hidden hover:border-gray-600 transition-all">
                        <CardHeader className="p-0">
                            {/* Card Image - Full width at top */}
                            <div className="relative bg-gray-900 flex items-center justify-center p-6">
                                <img
                                    src={card.card_image}
                                    alt={card.card_name}
                                    className="w-full max-w-70 h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="p-5">
                            {/* Header with badges */}
                            <div className="mb-4">
                                <CardTitle className="text-xl text-gray-100 mb-2">{card.card_name}</CardTitle>
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <Badge variant={getRarityVariant(card.rarity)} className="font-semibold">
                                        {card.rarity}
                                    </Badge>
                                    <Badge variant={getColorVariant(card.card_color)}>
                                        {card.card_color}
                                    </Badge>
                                </div>
                                <CardDescription className="text-xs text-gray-400">{card.card_set_id}</CardDescription>
                            </div>

                            <Separator className="mb-4 bg-gray-700" />

                            {/* Tabs for organized information */}
                            <Tabs defaultValue="stats" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                                    <TabsTrigger value="stats">Stats</TabsTrigger>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                                </TabsList>

                                <TabsContent value="stats" className="space-y-3 mt-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-gray-900 border border-gray-700 px-3 py-2 rounded">
                                            <p className="text-xs text-gray-400">Type</p>
                                            <p className="font-semibold text-sm text-gray-100">{card.card_type}</p>
                                        </div>
                                        <div className="bg-gray-900 border border-gray-700 px-3 py-2 rounded">
                                            <p className="text-xs text-gray-400">Cost</p>
                                            <p className="font-semibold text-sm text-gray-100">{card.card_cost}</p>
                                        </div>
                                        <div className="bg-gray-900 border border-gray-700 px-3 py-2 rounded">
                                            <p className="text-xs text-gray-400">Power</p>
                                            <p className="font-semibold text-sm text-gray-100">{card.card_power}</p>
                                        </div>
                                        <div className="bg-gray-900 border border-gray-700 px-3 py-2 rounded">
                                            <p className="text-xs text-gray-400">Counter</p>
                                            <p className="font-semibold text-sm text-gray-100">{card.counter_amount || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900 border border-gray-700 px-3 py-2 rounded">
                                        <p className="text-xs text-gray-400">Attribute</p>
                                        <p className="text-sm text-gray-200">{card.attribute}</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="details" className="space-y-3 mt-4">
                                    {card.sub_types && (
                                        <div className="bg-gray-900 border border-gray-700 p-3 rounded">
                                            <p className="text-xs text-gray-400 mb-1">Sub Types</p>
                                            <p className="text-sm text-gray-200">{card.sub_types}</p>
                                        </div>
                                    )}
                                    <div className="bg-gray-900 border border-gray-700 p-3 rounded">
                                        <p className="text-xs text-gray-400 mb-2">Effect</p>
                                        <p className="text-sm text-gray-200 leading-relaxed">{card.card_text}</p>
                                    </div>
                                    <div className="bg-gray-900 border border-gray-700 p-3 rounded">
                                        <p className="text-xs text-gray-400 mb-1">Set</p>
                                        <p className="text-sm text-gray-200">{card.set_name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{card.set_id}</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="pricing" className="space-y-3 mt-4">
                                    <div className="bg-gray-900 border border-gray-700 p-4 rounded">
                                        <div className="flex justify-between items-center mb-3">
                                            <div>
                                                <p className="text-xs text-gray-400">Market Price</p>
                                                <p className="text-2xl font-bold text-green-400">${card.market_price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <Separator className="mb-3 bg-gray-700" />
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-gray-400">Inventory Price</p>
                                                <p className="text-2xl font-bold text-blue-400">${card.inventory_price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900 border border-gray-700 p-3 rounded">
                                        <p className="text-xs text-gray-400 mb-1">Last Updated</p>
                                        <p className="text-sm text-gray-200">{new Date(card.date_scraped).toLocaleDateString()}</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
export default OnePieceTest