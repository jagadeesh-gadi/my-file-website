#include <stdio.h>
#include <string.h>

int i, j;

void longestWord(char *str)
{
    char *p = str;

    int max = 0;
    int count = 0;

    i = 0; // initialize i
    j = 0; // initialize j

    while (*p != '\0')
    {
        if (str[i] == ' ' || str[i] == '\n')
        {
            max = (max > count) ? max : count;
            j = (max > count) ? j : (i - count);

            count = -1;
        }

        count++;
        i++;
        p++;
    }

    if (max < count)
    {
        max = count;
        j = i - count;
    }

    printf("Longest word = ");

    for (i = j; i < j + max; i++)
    {
        printf("%c", str[i]);
    }

    printf("\n");
}

int countNonRepeating(char *str)
{
    int frequency;
    int nonRepeating = 0;

    for (i = 0; str[i] != '\0'; i++)
    {
        if (str[i] == ' ' || str[i] == '\n')
            continue;

        frequency = 0;

        for (j = 0; str[j] != '\0'; j++)
        {
            if (str[i] == str[j])
                frequency++;
        }

        if (frequency == 1)
        {
            printf("%c ", str[i]);
            nonRepeating++;
        }
    }

    return nonRepeating;
}

int main()
{
    char str[100];

    printf("Enter a string: ");
    fgets(str, sizeof(str), stdin);

    longestWord(str);

    printf("Non-repeating characters = ");

    printf("\nCount = %d\n",
           countNonRepeating(str));

    return 0;
}