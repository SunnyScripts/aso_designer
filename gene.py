def get_consecutive_sequences(gene: str, seq_length: int) -> list:
    """
    Returns all consecutive subsequences (substrings) of the given gene sequence 
    with the specified length.

    Parameters:
    gene (str): A string representing gene base pairs (e.g., "ATCG").
    seq_length (int): The length of each consecutive subsequence to extract.

    Returns:
    list: A list of consecutive subsequences of length `seq_length`.
    """
    if seq_length <= 0 or seq_length > len(gene):
        # Optionally, you can raise an exception if inputs are invalid.
        return []
    
    # Use a list comprehension to generate all substrings of length seq_length.
    return [gene[i:i + seq_length] for i in range(len(gene) - seq_length + 1)]

# Example usage:
gene_sequence = "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG"
desired_length = 5
subsequences = get_consecutive_sequences(gene_sequence, desired_length)
print(subsequences)


