import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

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
  { id: 1, title: "Cyber Legends", category: "Экшен", rating: 4.8, downloads: "10M+", size: "250 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isNew: true, isTrending: true },
  { id: 2, title: "Racing Neon", category: "Гонки", rating: 4.6, downloads: "8M+", size: "180 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg", isTrending: true },
  { id: 3, title: "Puzzle Galaxy", category: "Головоломки", rating: 4.9, downloads: "15M+", size: "120 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg", isNew: true },
  { id: 4, title: "Battle Arena", category: "Стратегия", rating: 4.7, downloads: "12M+", size: "300 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isTrending: true },
  { id: 5, title: "Space Shooter", category: "Аркада", rating: 4.5, downloads: "6M+", size: "150 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg", isNew: true },
  { id: 6, title: "Fantasy Quest", category: "RPG", rating: 4.8, downloads: "20M+", size: "400 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg" },
  { id: 7, title: "Shadow Warriors", category: "Экшен", rating: 4.7, downloads: "18M+", size: "320 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isTrending: true },
  { id: 8, title: "Drift Kings", category: "Гонки", rating: 4.4, downloads: "7M+", size: "220 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg", isNew: true },
  { id: 9, title: "Mind Maze", category: "Головоломки", rating: 4.6, downloads: "12M+", size: "95 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg" },
  { id: 10, title: "Empire Defense", category: "Стратегия", rating: 4.8, downloads: "25M+", size: "380 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isTrending: true },
  { id: 11, title: "Retro Blaster", category: "Аркада", rating: 4.3, downloads: "5M+", size: "110 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg" },
  { id: 12, title: "Dragon Saga", category: "RPG", rating: 4.9, downloads: "30M+", size: "450 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isNew: true, isTrending: true },
  { id: 13, title: "Zombie Strike", category: "Экшен", rating: 4.5, downloads: "14M+", size: "280 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg" },
  { id: 14, title: "Turbo Rush", category: "Гонки", rating: 4.7, downloads: "11M+", size: "200 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg", isTrending: true },
  { id: 15, title: "Logic Master", category: "Головоломки", rating: 4.8, downloads: "20M+", size: "85 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg", isNew: true },
  { id: 16, title: "War Commander", category: "Стратегия", rating: 4.6, downloads: "16M+", size: "340 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg" },
  { id: 17, title: "Pixel Fighters", category: "Аркада", rating: 4.4, downloads: "9M+", size: "130 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg" },
  { id: 18, title: "Mystic Realms", category: "RPG", rating: 4.7, downloads: "22M+", size: "410 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isTrending: true },
  { id: 19, title: "Gun Master 3D", category: "Экшен", rating: 4.6, downloads: "13M+", size: "270 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isNew: true },
  { id: 20, title: "Street Racer X", category: "Гонки", rating: 4.5, downloads: "10M+", size: "195 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg" },
  { id: 21, title: "Brain Teaser Pro", category: "Головоломки", rating: 4.9, downloads: "18M+", size: "100 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg", isTrending: true },
  { id: 22, title: "Castle Siege", category: "Стратегия", rating: 4.7, downloads: "19M+", size: "360 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg", isNew: true },
  { id: 23, title: "Neon Pinball", category: "Аркада", rating: 4.2, downloads: "4M+", size: "120 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/d1937173-f826-46bc-be1a-eb4001dd47c9.jpg" },
  { id: 24, title: "Kingdom Hearts", category: "RPG", rating: 4.8, downloads: "28M+", size: "480 МБ", image: "https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/1d843a70-8a15-4bd7-845e-9535480559a8.jpg" }
];

const categories = ["Все", "Экшен", "Гонки", "Головоломки", "Стратегия", "Аркада", "RPG"];

const TELEGRAM_BOT_URL = "https://t.me/worldgemisbot";

interface User {
  username: string;
  email: string;
  avatar?: string;
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [activeTab, setActiveTab] = useState("home");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { toast } = useToast();

  const handleDownload = (game: Game) => {
    setSelectedGame(game);
    setIsVerificationOpen(true);
  };

  const toggleFavorite = (gameId: number) => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите в аккаунт, чтобы добавлять игры в избранное",
        variant: "destructive"
      });
      return;
    }
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'login') {
      setUser({
        username: email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      });
      toast({
        title: "Добро пожаловать! 🎮",
        description: `Рады видеть тебя, ${email.split('@')[0]}!`
      });
    } else {
      setUser({
        username: username,
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      });
      toast({
        title: "Регистрация успешна! 🎉",
        description: `Аккаунт ${username} создан!`
      });
    }
    
    setIsAuthOpen(false);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
    toast({
      title: "Выход выполнен",
      description: "До встречи! 👋"
    });
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const newGames = games.filter(g => g.isNew);
  const trendingGames = games.filter(g => g.isTrending);
  const favoriteGames = games.filter(g => favorites.includes(g.id));

  const GameCard = ({ game }: { game: Game }) => {
    const isFavorite = favorites.includes(game.id);
    
    return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 animate-fade-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 z-10">
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full transition-all duration-300 ${
                isFavorite 
                  ? 'bg-secondary hover:bg-secondary/80 animate-pulse-glow' 
                  : 'bg-background/70 hover:bg-background/90'
              }`}
              onClick={() => toggleFavorite(game.id)}
            >
              <Icon 
                name="Heart" 
                size={20} 
                className={isFavorite ? 'fill-secondary text-secondary' : 'text-foreground'}
              />
            </Button>
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            {game.isNew && (
              <Badge className="bg-secondary text-secondary-foreground font-bold">NEW</Badge>
            )}
            {game.isTrending && (
              <Badge className="bg-accent text-accent-foreground font-bold">🔥 HOT</Badge>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <Button 
              className="bg-primary hover:bg-primary/90 animate-pulse-glow"
              onClick={() => handleDownload(game)}
            >
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
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative bg-cover bg-center py-20 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.85), rgba(26, 31, 44, 0.95)), url('https://cdn.poehali.dev/projects/3dd1fe5a-10d0-433d-82eb-7e1a4d3e06ef/files/736f8d57-31cd-47f5-8298-35f438008035.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-card/50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-foreground">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Icon name="Heart" size={16} />
                    Избранное ({favorites.length})
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Icon name="Settings" size={16} />
                    Настройки
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
                    <Icon name="LogOut" size={16} />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="User" className="mr-2" size={18} />
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                    </DialogTitle>
                    <DialogDescription>
                      {authMode === 'login' 
                        ? 'Войдите, чтобы сохранять избранное и получать персональные рекомендации'
                        : 'Создайте аккаунт, чтобы начать пользоваться всеми возможностями'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAuth} className="space-y-4">
                    {authMode === 'register' && (
                      <div className="space-y-2">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input
                          id="username"
                          placeholder="gamer228"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="player@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    >
                      {authMode === 'login' ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="text-center">
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-card/50 backdrop-blur-sm p-1 h-auto">
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
            <TabsTrigger value="favorites" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 relative">
              <Icon name="Heart" size={18} />
              <span className="hidden sm:inline">Избранное</span>
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary text-xs">
                  {favorites.length}
                </Badge>
              )}
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

          <TabsContent value="favorites">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Heart" className="text-secondary fill-secondary" />
              Мои избранные ({favorites.length})
            </h2>
            {favoriteGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteGames.map(game => <GameCard key={game.id} game={game} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-muted-foreground">Нет избранных игр</h3>
                <p className="text-muted-foreground">Добавь игры в избранное, нажав на ❤️</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Icon name="ShieldCheck" className="text-primary" />
              Проверка на бота
            </DialogTitle>
            <DialogDescription>
              Для защиты от автоматических скачиваний необходимо пройти проверку
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedGame && (
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedGame.image} 
                      alt={selectedGame.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{selectedGame.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedGame.category} • {selectedGame.size}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="Star" size={14} className="fill-secondary text-secondary" />
                        <span className="text-sm font-semibold">{selectedGame.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-primary mt-1" size={20} />
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Как пройти проверку:</p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Нажмите кнопку "Пройти проверку"</li>
                    <li>Откроется Telegram бот</li>
                    <li>Нажмите "/start" в боте</li>
                    <li>Получите ссылку на скачивание</li>
                  </ol>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 h-12"
              onClick={() => window.open(TELEGRAM_BOT_URL, '_blank')}
            >
              <Icon name="Send" className="mr-2" />
              Пройти проверку в Telegram
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Проверка занимает менее 30 секунд 🚀
            </p>
          </div>
        </DialogContent>
      </Dialog>

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