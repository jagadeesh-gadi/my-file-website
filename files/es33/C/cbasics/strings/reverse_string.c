#include <stdio.h>
#include <string.h>

int main()
{
    char str[100];
    char temp;

    fgets(str, 100, stdin);
    int i, len = 0;
    while (str[len] != '\0')
    {
        len++;
    }
    for (i = 0; i < len / 2; i++)
    {
        temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
    printf("string :: %s\n", str);
    // strrev(str);
    printf("Reversed string: %s\n", str);

    return 0;
}