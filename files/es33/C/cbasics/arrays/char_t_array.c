#include <stdio.h>

int main()
{
    // string literials
    char name1[] = {"jagadeesh\0"}; // it was consider the "\0" is also one value
    // char array initilizer (with " \0")
    char name2[] = {'j', 'a', 'g', 'a', 'd', 'e', 'e', 's', 'h', '\0'};

    // char array initilizer (without "\0")
    char name3[] = {'j', 'a', 'g', 'a', 'd', 'e', 'e', 's', 'h'}; // it will printing the value as double upto finindg the null "\0" vlaue in the address

    printf("name 1: Address = %p size=%zu bytes value = %s\n", (void *)name1, sizeof(name1), name1);

    printf("name 2: Address = %p size=%zu bytes value = %s\n", (void *)name2, sizeof(name2), name2);

    printf("name 3: Address = %p size=%zu bytes value = %s\n", (void *)name3, sizeof(name3), name3);
    return 0;
}