package io.github.dougllasfps.vendasapi.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private String email;

    @Column(name="data_nascimento")
    private LocalDate nascimento;
    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    public Cliente() {
        super();
    }

    public Cliente(
        Long id,
        String cpf,
        String nome,
        String endereco,
        String telefone,
        String email,
        LocalDate nascimento,
        LocalDate dataCadastro
    ) {
        super();
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.nascimento = nascimento;
        this.dataCadastro = dataCadastro;
    }

    public Cliente(String cpf, String nome, String endereco,
       String telefone, String email, LocalDate nascimento, LocalDate dataCadastro) {
        super();
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.nascimento = nascimento;
        this.dataCadastro = dataCadastro;
    }

    @PrePersist
    public void prePersist(){
        setDataCadastro(LocalDate.now());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getNascimento() {
        return nascimento;
    }

    public void setNascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}
