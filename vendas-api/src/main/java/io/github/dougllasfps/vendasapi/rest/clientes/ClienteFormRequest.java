package io.github.dougllasfps.vendasapi.rest.clientes;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.dougllasfps.vendasapi.model.Cliente;

import java.time.LocalDate;

public class ClienteFormRequest {

    private Long id;
    private String nome;
    private String cpf;
    private String endereco;
    private String email;
    private String telefone;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;

    public ClienteFormRequest() {
        super();
    }

    public ClienteFormRequest(
            Long id, String nome, String cpf,
            String endereco, String email, String telefone,
            LocalDate dataCadastro, LocalDate dataNascimento) {
        super();
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.dataCadastro = dataCadastro;
        this.dataNascimento = dataNascimento;
    }

    public ClienteFormRequest(
        String nome, String cpf, String endereco,
        String email, String telefone, LocalDate dataCadastro,
        LocalDate dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.dataCadastro = dataCadastro;
        this.dataNascimento = dataNascimento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Cliente toModel(){
        return new Cliente(id, cpf, nome, endereco, telefone, email, dataNascimento, dataNascimento);
    }

    public static ClienteFormRequest fromModel(Cliente cliente){
        return new ClienteFormRequest(cliente.getId(), cliente.getNome(), cliente.getCpf(), cliente.getEndereco(), cliente.getEmail(), cliente.getTelefone(), cliente.getDataCadastro(), cliente.getNascimento());
    }

}
