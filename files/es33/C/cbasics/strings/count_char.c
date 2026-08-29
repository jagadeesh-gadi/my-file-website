// count the character in the input and types "alphabates","numbers","symbols","space "
#include <stdio.h>
#include <string.h>

int main()
{
    char str[100];
    printf("Enter string: ");
    fgets(str, sizeof(str), stdin);
    int i, alp = 0, num = 0, sym = 0, space = 0;
    for (i = 0; str[i] != 0; i++)
    {
        if ((str[i] >= 'A' && str[i] <= 'Z') || (str[i] >= 'a' && str[i] <= 'z'))
        {
            alp++;
        }
        else if (str[i] >= '0' && str[i] <= '9')
            num++;
        else if (str[i] == ' ')
            space++;
        else if (str[i] != '\n')
            sym++;
    }
    printf("Alphabets       : %d\n", alp);
    printf("Numbers         : %d\n", num);
    printf("Special Symbols : %d\n", sym);
    printf("Spaces          : %d\n", space);
    return 0;
}