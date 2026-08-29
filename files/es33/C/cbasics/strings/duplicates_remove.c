#include <stdio.h>
#include <string.h>

int main()
{
    char str[100];
    int i, j, k;
    fgets(str, 100, stdin);
    for (i = 0; str[i] != '\0'; i++)
    {
        for (j = i + 1; str[j] != '\0'; j++)
        {
            if (str[i] == str[j])
            {
                for (k = j; str[k] != '\0'; k++)
                {
                    str[k] = str[k + 1];
                }
                j--;
            }
        }
    }
    printf("After removing duplicates: %s\n", str);
    return 0;
}
// int main()
// {
//     // int i = 0;
//     char name[] = {70, 97, 105, 116, 104, 0};
//     // strcat(name, name1);
//     // gets(name);
//     // while (name)

//     // {
//     printf("%s\n", name);
//     // i++;
//     // }
//     return 0;
// }