// find the longest word count in the string
#include <stdio.h>

int main()
{
    char str[100];
    int i = 0, j, count = 0, max = 0;
    fgets(str, 100, stdin);

    while (str[i] != '\0')
    {
        if (str[i] == ' ' || str[i] == '\0')
        {
            max = (max > count) ? max : count;
            j = (max > count) ? j : (i - 1);
            count = -1;
        }
        count++;
        i++;
    }
    if (max < count)
    {
        max = count;
        j = i - count;
    }

    for (i = j; i < j + max; i++)
    {
        printf("%c", str[i]);
    }
    return 0;
}