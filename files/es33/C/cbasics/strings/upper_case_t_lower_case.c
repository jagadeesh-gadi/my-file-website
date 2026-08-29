#include <stdio.h>

int main()
{
    char str[10];
    int i;
    fgets(str, sizeof(str), stdin);
    // int l = strlen(str);

    for (i = 0; str[i] != '\0'; i++)
    {
        if (str[i] >= 'A' && str[i] <= 'Z')
            str[i] = str[i] + 32;
        else
        {
            str[i] = str[i] - 32;
        }
    }
    printf("values of the string ::%s\n", str);
    return 0;
}