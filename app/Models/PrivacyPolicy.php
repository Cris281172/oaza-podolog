<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrivacyPolicy extends Model
{
    protected $fillable = ['title', 'intro', 'content'];

    protected $casts = ['content' => 'array'];

    public static function defaultTitle(): string
    {
        return 'Polityka prywatności i cookies';
    }

    public static function defaultIntro(): string
    {
        return 'Dowiedz się, jakie dane mogą być przetwarzane podczas korzystania ze strony oraz jak możesz zarządzać swoją prywatnością.';
    }

    public static function defaultContent(): array
    {
        $heading = fn (string $text) => ['type' => 'heading', 'attrs' => ['level' => 2], 'content' => [['type' => 'text', 'text' => $text]]];
        $paragraph = fn (string $text) => ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => $text]]];

        return ['type' => 'doc', 'content' => [
            $heading('1. Administrator danych'),
            $paragraph('Administratorem danych osobowych jest właściciel Gabinetu Podologiczna Oaza, ul. Mieczysławy Ćwiklińskiej 1E, 25-437 Kielce. W sprawach dotyczących prywatności można skontaktować się telefonicznie pod numerem 505 849 060.'),
            $heading('2. Zakres i cele przetwarzania danych'),
            $paragraph('Strona ma charakter informacyjny i nie zawiera formularza kontaktowego, newslettera ani płatności. Kontakt z gabinetem odbywa się telefonicznie.'),
            $paragraph('Podczas korzystania ze strony serwer może automatycznie zapisywać dane techniczne, takie jak adres IP, data i czas żądania, typ przeglądarki oraz odwiedzony adres. Dane te służą zapewnieniu bezpieczeństwa, poprawnego działania strony i diagnozowaniu błędów. Podstawą przetwarzania jest prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO).'),
            $paragraph('Dane przekazane podczas rozmowy telefonicznej mogą być przetwarzane w celu udzielenia odpowiedzi, umówienia wizyty lub wykonania usługi — zależnie od sprawy na podstawie art. 6 ust. 1 lit. b lub f RODO. Dane dotyczące zdrowia są przetwarzane wyłącznie wtedy, gdy jest to zgodne z właściwą podstawą prawną i niezbędne do świadczenia usług.'),
            $heading('3. Cookies i pamięć przeglądarki'),
            $paragraph('Strona może korzystać z technicznie niezbędnych plików cookies związanych z bezpieczeństwem, sesją i ustawieniami interfejsu. Bez nich niektóre elementy strony lub panelu administracyjnego nie działałyby prawidłowo.'),
            $paragraph('Strona nie korzysta obecnie z Google Analytics, remarketingu ani pikseli reklamowych. Jeśli takie narzędzia zostaną uruchomione, polityka i mechanizm zgód zostaną odpowiednio zaktualizowane.'),
            $heading('4. Google Maps i serwisy społecznościowe'),
            $paragraph('Strona korzysta z osadzonej mapy Google Maps. Podczas wyświetlania mapy przeglądarka łączy się z usługą Google. Google może wtedy otrzymać m.in. adres IP i informacje o urządzeniu oraz stosować własne technologie przechowywania danych zgodnie ze swoją polityką prywatności.'),
            $paragraph('Strona zawiera zwykłe odnośniki do profili w serwisach Facebook i TikTok. Wejście w taki link powoduje przejście do zewnętrznego serwisu, który działa na podstawie własnej polityki prywatności.'),
            $heading('5. Odbiorcy i czas przechowywania danych'),
            $paragraph('Dostęp do danych mogą mieć podmioty zapewniające hosting, utrzymanie techniczne i bezpieczeństwo strony — wyłącznie w zakresie niezbędnym do realizacji tych usług. Logi techniczne są przechowywane przez okres potrzebny do zapewnienia bezpieczeństwa i wyjaśnienia ewentualnych incydentów, a dane związane z kontaktem lub usługą przez okres niezbędny do obsługi sprawy oraz spełnienia obowiązków prawnych. Po włączeniu mapy odbiorcą danych może być Google. Korzystanie z tej usługi może wiązać się z przekazaniem danych poza Europejski Obszar Gospodarczy na zasadach określonych przez Google.'),
            $heading('6. Prawa użytkownika'),
            $paragraph('Na zasadach przewidzianych w RODO użytkownik ma prawo żądać dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, a także wnieść sprzeciw wobec przetwarzania. Jeżeli podstawą przetwarzania jest zgoda, można ją wycofać w dowolnym momencie bez wpływu na zgodność wcześniejszego przetwarzania z prawem. Użytkownik może również złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.'),
            $heading('7. Zmiany polityki'),
            $paragraph('Polityka może być aktualizowana w przypadku zmian funkcjonalności strony, używanych narzędzi lub obowiązujących przepisów. Aktualna wersja jest zawsze dostępna pod tym adresem.'),
        ]];
    }
}
