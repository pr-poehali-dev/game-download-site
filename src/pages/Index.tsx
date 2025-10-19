import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  category: string;
  rating: number;
  downloads: string;
  size: string;
  image: string;
  isNew?: boolean;
  isTrending?: boolean;
}

const games: Game[] = [
  {
    id: 1,
    title: "Cyber Legends",
    category: "Экшен",
    rating: 4.8,
    downloads: "10M+",
    size: "250 МБ",
    image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg",
    isNew: true,
    isTrending: true
  },
  {
    id: 2,
    title: "Racing Neon",
    category: "Гонки",
    rating: 4.6,
    downloads: "8M+",
    size: "180 МБ",
    image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg",
    isTrending: true
  },
  {
    id: 3,
    title: "Puzzle Galaxy",
    category: "Головоломки",
    rating: 4.9,
    downloads: "15M+",
    size: "120 МБ",
    image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg",
    isNew: true
  },
  {
    id: 4,
    title: "Battle Arena",
    category: "Стратегия",
    rating: 4.7,
    downloads: "12M+",
    size: "300 МБ",
    image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg",
    isTrending: true
  },
  {
    id: 5,
    title: "Space Shooter",
    category: "Аркада",
    rating: 4.5,
    downloads: "6M+",
    size: "150 МБ",
    image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg",
    isNew: true
  },
  {
    id: 6,
    title: "Fantasy Quest",
    category: "RPG",
    rating: 4.8,
    downloads: "20M+",
    size: "400 МБ",
    image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg"
  }
];

const categories = ["Все", "Экшен", "Гонки", "Головоломки", "Стратегия", "Аркада", "RPG"];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [activeTab, setActiveTab] = useState("home");

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const newGames = games.filter(g => g.isNew);
  const trendingGames = games.filter(g => g.isTrending);

  const GameCard = ({ game }: { game: Game }) => (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 animate-fade-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {game.isNew && (
              <Badge className="bg-secondary text-secondary-foreground font-bold">NEW</Badge>
            )}
            {game.isTrending && (
              <Badge className="bg-accent text-accent-foreground font-bold">🔥 HOT</Badge>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <Button className="bg-primary hover:bg-primary/90 animate-pulse-glow">
              <Icon name="Download" className="mr-2" size={16} />
              Скачать
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-foreground">{game.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">{game.category}</Badge>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="fill-secondary text-secondary" />
              <span className="text-sm font-semibold text-foreground">{game.rating}</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="Download" size={12} />
              {game.downloads}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="HardDrive" size={12} />
              {game.size}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative bg-cover bg-center py-20 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.85), rgba(26, 31, 44, 0.95)), url('https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/736f8d57-31cd-47f5-8298-35f438008035.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
            ПЕСНИС228
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            Твой игровой портал для мобильных игр
          </p>
          <div className="relative max-w-2xl mx-auto animate-scale-in">
            <Input
              type="text"
              placeholder="Найди свою игру..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-14 pr-4 text-lg bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all"
            />
            <Icon name="Search" className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-card/50 backdrop-blur-sm p-1 h-auto">
            <TabsTrigger value="home" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
              <Icon name="Grid3x3" size={18} />
              <span className="hidden sm:inline">Каталог</span>
            </TabsTrigger>
            <TabsTrigger value="top" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
              <Icon name="Trophy" size={18} />
              <span className="hidden sm:inline">Топ</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
              <Icon name="Sparkles" size={18} />
              <span className="hidden sm:inline">Новинки</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
              <Icon name="TrendingUp" size={18} />
              <span className="hidden sm:inline">Тренды</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Icon name="TrendingUp" className="text-secondary" />
                Популярное сейчас
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingGames.map(game => <GameCard key={game.id} game={game} />)}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Icon name="Sparkles" className="text-accent" />
                Новинки
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newGames.map(game => <GameCard key={game.id} game={game} />)}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="catalog">
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
            </div>
          </TabsContent>

          <TabsContent value="top">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Trophy" className="text-secondary" />
              Топ игр по рейтингу
            </h2>
            <div className="space-y-4">
              {topGames.map((game, index) => (
                <Card key={game.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 animate-fade-in">
                  <CardContent className="p-0 flex items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-3xl font-black text-white">#{index + 1}</span>
                    </div>
                    <img src={game.image} alt={game.title} className="w-24 h-24 object-cover" />
                    <div className="flex-grow py-4">
                      <h3 className="font-bold text-lg">{game.title}</h3>
                      <p className="text-sm text-muted-foreground">{game.category}</p>
                    </div>
                    <div className="flex items-center gap-2 pr-6">
                      <Icon name="Star" size={20} className="fill-secondary text-secondary" />
                      <span className="text-2xl font-bold">{game.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Sparkles" className="text-accent" />
              Свежие релизы
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newGames.map(game => <GameCard key={game.id} game={game} />)}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="TrendingUp" className="text-secondary" />
              Горячие игры 🔥
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingGames.map(game => <GameCard key={game.id} game={game} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ПЕСНИС228
          </h3>
          <p className="text-muted-foreground">Все права защищены © 2025</p>
        </div>
      </footer>
    </div>
  );
}
