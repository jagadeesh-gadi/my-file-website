// Check whether a character is:
// Uppercase
// Lowercase
// Digit
// Special character

#include <stdio.h>
#include <string.h>

int main()
{
    char str;
    scanf("%c", &str);
    if (str >= 'A' && str <= 'Z')
        printf("upper case ");
    else if (str >= 'a' && str <= 'z')
        printf("Lower case ");
    else if (str >= '0' && str <= '9')
        printf("Digit case ");
    else
        printf("special symbols");
    return 0;
}
