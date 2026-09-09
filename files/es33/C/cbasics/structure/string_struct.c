#include <stdio.h>
#include <string.h>

struct device
{
    char name[20];
};

int main()
{
    struct device d1, d2;
    char input[50];

    printf("Enter input values :: ");
    fgets(input, sizeof(input), stdin);

    // Remove the newline
    input[strcspn(input, "\n")] = '\0';

    // Using strcpy
    strcpy(d1.name, input);

    // Using strncpy
    strncpy(d2.name, input, sizeof(d2.name) - 1);
    // d2.name[sizeof(d2.name) - 1] = '\0';

    printf("strcpy  :: %s\n", d1.name);
    printf("strncpy :: %s\n", d2.name);
    fputs(d2.name, stdout);
    printf("\n");
    return 0;
}