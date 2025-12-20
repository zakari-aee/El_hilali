import { Link } from "wouter";
import { Button } from "./button";
import { Card, CardContent, CardFooter } from "./card";
import { cn } from "../../lib/utils";
import { useLanguage } from "../../lib/i18n";

export function ProductCard({ product, className }) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn("group block h-full", className)}
    >
      <Card className="h-full border-none shadow-none bg-transparent overflow-hidden">
        <CardContent className="p-0 relative aspect-[4/5] overflow-hidden bg-secondary/50 rounded-sm mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 px-4">
            <Button className="w-full bg-white/90 hover:bg-white text-foreground shadow-sm backdrop-blur-sm">
              {t("product.details")}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="p-0 flex flex-col items-start gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-serif text-lg font-medium group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-medium">
            DH {product.price.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
