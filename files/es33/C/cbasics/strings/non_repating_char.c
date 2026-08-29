// find the non_repating characters
#include <stdio.h>

int main()
{
    char str[90];
    int i, j, count;
    printf("enter string:: ");
    fgets(str, sizeof(str), stdin);
    printf("Non-repeating characters: \n");
    for (i = 0; str[i] != '\0'; i++)
    {
        count = 0;
        for (j = 0; str[j] != '\0'; j++)
        {
            if (str[i] == str[j])
                count++;
        }
        if (count == 1)
            printf("%c ", str[i]);
    }
    printf("\n");
    return 0;
}